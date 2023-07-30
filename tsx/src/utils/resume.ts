import React, { useState } from 'react';
import YAML from 'yaml';

import { Job } from '../Career';
import { httpClient } from '../http/client';
import { SummaryItem } from '../Summary';

type ResumePhoto = {
  base64: string;
  width: string;
  height: string;
  type: string;
}

export type YAMLResume = {
  photo?: ResumePhoto;
  name: string;
  email?: string;
  fundamentals: {
    [key: string]: string;
  };
  summary: SummaryItem[];
  projects: SummaryItem[];
  extras: SummaryItem[];
  career: {
    title?: string;
    jobs: Job[];
  };
  source: string;
}

type ResumeStateSetter = React.Dispatch<
  React.SetStateAction<YAMLResume>
>;

const loadData = (data: string, setState?: ResumeStateSetter) => {
  const structure = YAML.parse(data);
  structure.source = data;
  if (setState) setState(structure);
  return structure;
};

export const resume = {
  loadData,
  loadStaticDefault: async (
    setState?: ResumeStateSetter
  ): Promise<YAMLResume> => {
    const { data } = await httpClient.getDefaultCV();
    return loadData(data, setState);
  },
  photoAsBackground: (structure: YAMLResume): React.CSSProperties => ({
    ...(structure.photo
      ? {
        backgroundImage: `url('data:${
          structure.photo?.type
        };base64,${
          structure.photo?.base64.replaceAll(/\n/g,'')
        }')`,
      }
      : {}),
    height: structure.photo?.height,
    width: structure.photo?.width,
  }),
  // eslint-disable-next-line react/hook-use-state
  useState: () => useState({} as YAMLResume),
};
