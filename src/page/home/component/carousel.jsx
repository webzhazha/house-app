import React from 'react'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css'
class Carousel extends React.Component {
 
  render() {
 
    const images = [
      {
        original: 'http://image.ziroom.com/g2m2/M00/EF/45/CtgFCFz3OBWAYMIMAAN2tAN4ZtE566.jpg'
      },
      {
        original: 'http://image.ziroom.com/g2m2/M00/73/B4/CtgFCF0QRLCAdTcZAAH2VpnxJuM033.jpg'
      },
      {
        original: 'http://image.ziroom.com/g2m2/M00/7C/EC/CtgFCV16BG6AQx64AALfbzJM9X0138.jpg'
      },
    ];
 
    return (
      <ImageGallery items={images} showThumbnails={false} showFullscreenButton={false} autoPlay={true} showPlayButton={false} showBullets={true}/>
    );
  }
 
}

export default Carousel