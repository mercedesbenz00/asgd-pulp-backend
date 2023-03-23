const sharp = require('sharp');

exports.addWatermarkTextOnImageBuffer = async (filebuffer) => {
    try {
      const width = 428;
      const height = 80;
      const text = "For Apical Use Only";
  
      const svgImage = `
      <svg width="${width}" height="${height}">
        <style>
        .title { fill: #001; font-size: 10px; font-weight: bold;}
        </style>
        <text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
      </svg>
      `;
      const svgBuffer = Buffer.from(svgImage);
      const imageBuffer = await sharp(filebuffer)
        .composite([
          {
            input: svgBuffer,
            top: 189,
            left: 0,
          },
        ])
        .toBuffer();
        return imageBuffer;
    } catch (error) {
      console.log(error);
    }
};
