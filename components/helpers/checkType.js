import Image from 'next/image';

const checkType = (prize) => {
    const regex = /(jpg|webp)/;
    const typeImage = regex.test(prize)
    console.log(prize)
    console.log(typeImage)
    if(typeImage) {
      return (
        <Image width={'300'} height={'200'} src={prize} alt={'prize description'}></Image>
      ) 
    } else {
      return (
        <iframe width={'300'} height={'200'} src={prize}></iframe>
      )
    
    }
  }

export default checkType