import React from 'react';
import ContentLoader from 'react-content-loader';

const PreloaderBlock = () => {
  return (
    <ContentLoader
      className='pizza-block'
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="140" cy="120" r="120" />
      <rect x="2" y="260" rx="6" ry="6" width="280" height="26" />
      <rect x="2" y="301" rx="6" ry="6" width="280" height="84" />
      <rect x="2" y="408" rx="6" ry="6" width="84" height="28" />
      <rect x="142" y="400" rx="20" ry="20" width="140" height="44" />
    </ContentLoader>
  );
};

export default PreloaderBlock;