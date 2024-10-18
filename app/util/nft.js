// components/NftIframe.js
import React from 'react';

const NftIframe = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        src="https://nft.alchemypay.org/?amount=5&appId=[your_api_key]&fiat=USD&merchantOrderNo=[your_merchantOrder_No]&name=NFTName&picture=[your_nft_pic_url]&quantity=3&signature=[your_signature]&type=MINT"
        allow="accelerometer; autoplay; camera; gyroscope; payment"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};

export default NftIframe;
