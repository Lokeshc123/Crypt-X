import React from 'react';
import { Image  , View} from 'react-native';

import { SvgUri } from 'react-native-svg';
const IconComponent = ({ iconUrl }) => {
  if (iconUrl.endsWith('.svg')) {
    // Render SVG
    return (
      <SvgUri
        uri={iconUrl}
        width="50"
        height="50"
      />
    );
  } else if (iconUrl.endsWith('.png') || iconUrl.endsWith('.jpg') || iconUrl.endsWith('.jpeg') || iconUrl.endsWith("PNG")) {
    // Render PNG
    return (
      <Image
        source={{ uri: iconUrl }}
        style={{ width: 50, height: 50 }}
      />
    );
  } 
};

export default IconComponent;
