const leaderShip = require("../models/leaderSchema");

//create a new application

const leaderApplication = async (req, res) => {
  try {
    const { name, district, postingName, qualification } = req.body;

    const newApplication = new leaderShip({
      name,
      district,
      postingName,
      qualification,
    });

    await newApplication.save();

    return res.status(200).json({
      data: newApplication,
      message: "Application Submitted Successfully",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "An error occured while processinh your Application" });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await leaderShip.find({});

    return res.status(200).json({ data: applications, msg: "Successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "An error occurred while fetching applications" });
  }
};

const newLeader = async (req, res) => {
  try {
    const { memberID, district, postingName } = req.body;

    //find and updating the application by memberId

    const application = await leaderShip.findOne({ memberID });

    if (!application) {
      return res.status(404).json({ error: "Member not found" });
    }

    const leaderShipId = generateUniqueLeaderShipId();

    application.leaderID = leaderShipId;
    application.district = district;
    application.postingName = postingName;

    if (application.leaderID) {
      return res
        .status(400)
        .json({ message: "This Member is already assigned as Leader" });
    }

    await application.save();

    return res
      .status(200)
      .json({ message: "Member assigned as leader", data: application });
  } catch (error) {
    return res.status(500).json({ error: "An error occured" });
  }
};

function generateUniqueLeaderShipId() {
  const digits = "0123456789";

  const prefix = "L-IHAF";

  let leaderID = prefix;

  for (let i = 0; i < 6; i++) {
    uid += digits[Math.floor(Math.random() * 10)];
  }

  return leaderID;
}

const getAllLeaders = async (req, res) => {
  try {
    const leaders = await leaderShip.find({ leaderID: { $exists: true } });
    return res.status(200).json({ leaders });
  } catch (error) {
    return res.status(400).json({ message: "Some Error" });
  }
};

const searchLeaders = async (req, res) => {
  try {
    const search = req.body.search ?? "";

    // Use a regular expression to perform a case-insensitive search
    const searchResults = await leaderShip.find({
      name: { $regex: search, $options: "i" },
      leaderID: { $regex: leaderID, $options: "i" },
      postingName: { $regex: postingName, $options: "i" },
    });

    return res.status(200).json({ data: searchResults, msg: "tada.....!!!!" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while searching for leaders" });
  }
};


const filterLeaders = async (req, res) => {
  try{
    const { district, postingName } = req.query;

    const query = {};

    if (district) {
      query.district = district;
    }

    if (postingName) {
      query.postingName = postingName;
    }

    const filteredLeaders = await leaderShip.find(query);

    return res.status(200).json(filteredLeaders);

  } catch (error) {
    return res.status(400).json({ error: 'An error occured while searching for leaders' });
  }
}


const suspendLeader = async (req, res) => {
  try {
    const {memberID} = req.body;

    const application = await leaderShip.findOne({ memberID });

    if (!application) {
      return res.status(404).json({ error : 'member not found'});
    }

    const currentDate = new Date();
    const suspensionEndDate = new Date();
    suspensionEndDate.setMonth(currentDate.getMonth() + 3);

    application.isSuspended = true;
    application.suspensionEndDate = suspensionEndDate;

    application.leaderID = undefined;
    application.postingName = undefined;
    application.district = undefined;

    await application.save();

    return res.status(200).json({ message: 'Leader suspended successfully'});
  } catch (error) {
    return res.status(400).json({ error: 'An error occured'});
  }
}


const removeLeaders = async (req, res) => {
  try{
    const {memberID} = req.body;

    const application = await leaderShip.findOne({ memberID });

    if(!application) {
      return res.status(400).json({ error: 'member not found'});
    }

    delete application.leaderID;
    delete application.postingName;
    delete application.district;

    await application.save();

    return res.status(200).json({message: 'Leader removed successfully'});

  } catch (error) {
    return res.status(404).json({error: 'An error occured'})
  }
}



// router.post('/create-leader', async (req, res) => {
//   try {
//     const { memberId, postingName, district } = req.body;

    
//     const existingLeader = await Application.findOne({ postingName, district, leaderID: { $exists: true } });

//     if (existingLeader) {
//       return res.status(400).json({ error: 'A leader is already present for this postingName and district' });
//     }

   
//     const application = await leaderShip.findOne({ memberId });

//     if (!application) {
//       return res.status(404).json({ error: 'Member not found' });
//     }

  
//     application.leaderID = memberId;
//     application.postingName = postingName;
//     application.district = district;

//     await application.save();

//     res.status(200).json({ message: 'Leader created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while creating the leader' });
//   }
// });






module.exports = {
  leaderApplication,
  getAllApplications,
  newLeader,
  getAllLeaders,
  searchLeaders,
  filterLeaders,
  suspendLeader,
  removeLeaders,
};
