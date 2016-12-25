function Sprite (options) {
  return {
    context: options.context,
    width: options.width,
    height: options.height,
    image: options.image
  };
}

module.exports = Sprite;
