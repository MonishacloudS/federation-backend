const JoinUs = require("../models/joinUsSchema");

function generateReferralCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const minLength = 10;

  let referralCode = "";

  while (referralCode.length < minLength) {
    const randomIndex = Math.floor(Math.random() * characters.length);

    referralCode += characters.charAt(randomIndex);
  }

  return referralCode;
}

const joinUsMember = async (req, res) => {
  const getJoinUs = {
    name: req.body.name,

    gender: req.body.gender,

    aadharCard: req.body.aadharCard,

    education: req.body.education || "",

    religion: req.body.religion || "",

    referralCode: req.body.referralCode || "",

    dateOfBirth: req.body.dateOfBirth,

    bloodGroup: req.body.bloodGroup || "",

    address: req.body.address || "",

    state: req.body.state || "",

    district: req.body.district || "",

    aadharCardURL: req.body.aadharCardURL || "",

    profileURL: req.body.profileURL || "",
  };

  const referralCode = generateReferralCode();

  getJoinUs.referralCode = referralCode; // Use dot notation to set the property

  // console.log( getJoinUs);

  const newMember = new JoinUs(getJoinUs);

  await newMember.save();

  return res

    .status(200)

    .json({ data: newMember, msg: "Member can be Created Successfully" });
};

const getAllNewMember = async (req, res) => {
  try {
    const allNewMembers = await JoinUs.find({ isAdminApproved: false });

    return res.status(200).json({
      data: allNewMembers,

      msg: "All new members retrieved successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Internal server error" });
  }
};

async function generateMemberId() {
  const prefix = "IHAf";

  // Generate member ID

  const memberCount = await JoinUs.countDocuments({ isAdminApproved: true });

  const memberIdNumber = memberCount + 1;

  const memberIdString = memberIdNumber.toString().padStart(4, "0");

  const memberID = prefix + memberIdString;

  return memberID;
}

const updateApproval = async (req, res) => {
  try {
    const member = await JoinUs.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ error: "User not found" });
    }

    if (member.suspendedUntil && member.suspendedUntil > new Date()) {
      // User is currently suspended; check if suspension period has expired

      return res.status(400).json({ error: "User is suspended" });
    }

    if (!member.isAdminApproved) {
      member.isAdminApproved = true;

      member.memberID = await generateMemberId();

      await member.save();

      return res

        .status(200)

        .json({ data: member, msg: "Member approved successfully" });
    } else {
      return res.status(400).json({ error: "Member is already approved" });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllExistingMember = async (req, res) => {
  try {
    const allExistingMembers = await JoinUs.find({ isAdminApproved: true });

    return res.status(200).json({
      data: allExistingMembers,

      msg: "All existing members retrieved successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Internal server error" });
  }
};

const suspendUser = async (req, res) => {
  try {
    const memberId = req.params.id;

    const suspensionEndDate = new Date();

    suspensionEndDate.setMonth(suspensionEndDate.getMonth() + 3);

    const member = await JoinUs.findByIdAndUpdate(
      memberId,

      { suspendedUntil: suspensionEndDate },

      { new: true }
    );

    if (!member) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ data: member, msg: "User suspended for 3 months" });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  joinUsMember,

  updateApproval,

  getAllNewMember,

  getAllExistingMember,

  suspendUser,
};
