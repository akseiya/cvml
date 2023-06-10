import React from 'react';
import YAML from 'yaml';

import httpClient from './http/client';

interface ResumePhoto {
  base64: string;
  width: string;
  height: string;
  type: string;
}

export interface YAMLResume {
  photo?: ResumePhoto;
};

type ResumeStateSetter = React.Dispatch<React.SetStateAction<YAMLResume>>;

export const resume = {
  loadStaticDefault: async (setState: ResumeStateSetter): Promise<YAMLResume> => {
    const {data} = await httpClient.getDefaultCV();
    const structure = YAML.parse(data);
    setState(structure);
    return structure;
  },
  photoAsBG: (structure: YAMLResume): React.CSSProperties => ({
    backgroundImage: `url('data:${structure.photo?.type};base64,${structure.photo?.base64}')` ,
    height: structure.photo?.height
  })
};