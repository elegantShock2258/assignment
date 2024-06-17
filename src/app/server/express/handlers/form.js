"use strict";

module.exports = async function (req, res) {
  const { name, number, countryCode, form } = req.body;

  if (!name || !number || !countryCode || !form) {
    return res
      .status(400)
      .json({ error: "Name, number, and country code are required" });
  }
  try {
    const formData = await prisma.formData.create({
      data: {
        Form: form,
        Name: name,
        ContactNumber: BigInt(number),
        CountryCode: countryCode,
      },
    });

    console.log("FormData saved:", formData);
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
    res.status(200).json({ message: "FormData saved successfully" });
  } catch (error) {
    console.error("Error saving FormData:", error);
    res.status(500).json({ error: "Failed to save FormData" });
  }

  res.status(200).json({ message: "FormData received successfully" });
};
