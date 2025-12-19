import type { Tutorial } from './types';
import { registryBrokerTutorial } from './tutorials/registry-broker';
import { hcs14IdentityTutorial } from './tutorials/hcs-14-identity';
import { hcs1InscriptionsTutorial } from './tutorials/hcs-1-inscriptions';
import { hcs5HashinalsTutorial } from './tutorials/hcs-5-hashinals';
import { floraPetalsStateTutorial } from './tutorials/flora-petals-state';
import { hcs21AdaptersTutorial } from './tutorials/hcs-21-adapters';
import { hashnetMcpTutorial } from './tutorials/hashnet-mcp';
import { openConvAiTutorial } from './tutorials/openconvai';

export const tutorials: Tutorial[] = [
  registryBrokerTutorial,
  hcs14IdentityTutorial,
  hcs1InscriptionsTutorial,
  hcs5HashinalsTutorial,
  floraPetalsStateTutorial,
  hcs21AdaptersTutorial,
  hashnetMcpTutorial,
  openConvAiTutorial,
];
