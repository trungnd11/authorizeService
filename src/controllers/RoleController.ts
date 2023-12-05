export const findRoleByName = async (req, res) => {
  try {
    const roleName = req.body
    console.log({ roleName });
    return res.status(200).json({ role: "ADMIM" });
  } catch (error) {

  }
}