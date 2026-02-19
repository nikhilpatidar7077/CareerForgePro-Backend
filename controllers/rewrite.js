// const { generateRewrite } = require("../services/llm.service");

// const rewriteBullet = async (req, res) => {
//   try {
//     const { bulletPoint, keyword } = req.body;

//     if (!bulletPoint || !keyword) {
//       return res.status(400).json({
//         message: "bulletPoint and keyword are required"
//       });
//     }

//     const rewrittenText = await generateRewrite(bulletPoint, keyword);

//     res.json({
//       success: true,
//       original: bulletPoint,
//       keywordUsed: keyword,
//       rewritten: rewrittenText
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Something went wrong"
//     });
//   }
// };

// module.exports = rewriteBullet

const { generateRewrite } = require("../services/llm.service");

const rewriteBullet = async (req, res) => {
  try {
    const { bulletPoint, bullets, keyword } = req.body;

    if (!keyword) {
      return res.status(400).json({
        message: "keyword is required"
      });
    }

    if (bulletPoint) {
      const rewritten = await generateRewrite(bulletPoint, keyword);

      return res.json({
        success: true,
        type: "single",
        original: bulletPoint,
        keywordUsed: keyword,
        rewritten
      });
    }

    if (bullets && Array.isArray(bullets)) {

      const rewrittenBullets = await Promise.all(
        bullets.map(bullet => generateRewrite(bullet, keyword))
      );

      return res.json({
        success: true,
        type: "multiple",
        keywordUsed: keyword,
        rewrittenBullets
      });
    }

    return res.status(400).json({
      message: "Provide either bulletPoint or bullets array"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};

module.exports = rewriteBullet;

