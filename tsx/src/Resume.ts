import React, { useState } from 'react';
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
  name: string;
  fundamentals: {
    [key: string]: string | string[];
  };
}

type ResumeStateSetter = React.Dispatch<
  React.SetStateAction<YAMLResume>
>;

export const resume = {
  loadStaticDefault: async (
    setState: ResumeStateSetter
  ): Promise<YAMLResume> => {
    const { data } = await httpClient.getDefaultCV();
    const structure = YAML.parse(data);
    setState(structure);
    return structure;
  },
  photoAsBackground: (structure: YAMLResume): React.CSSProperties => ({
    ...(structure.photo
      ? {
          backgroundImage: `url('data:${structure.photo?.type};base64,${structure.photo?.base64}')`,
        }
      : {}),
    height: structure.photo?.height,
    width: structure.photo?.width,
  }),
  // eslint-disable-next-line react/hook-use-state
  useState: () => useState({} as YAMLResume),
};
