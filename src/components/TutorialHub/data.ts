import type { Tutorial } from './types';
import { registryBrokerTutorial } from './tutorials/registry-broker';
import { hcs14IdentityTutorial } from './tutorials/hcs-14-identity';
import { hcs1InscriptionsTutorial } from './tutorials/hcs-1-inscriptions';
import { hcs2RegistriesTutorial } from './tutorials/hcs-2-registries';
import { hcs5HashinalsTutorial } from './tutorials/hcs-5-hashinals';
import { hcs11ProfilesTutorial } from './tutorials/hcs-11-profiles';
import { floraPetalsStateTutorial } from './tutorials/flora-petals-state';
import { hcs21AdaptersTutorial } from './tutorials/hcs-21-adapters';
import { hashnetMcpTutorial } from './tutorials/hashnet-mcp';
import { openConvAiTutorial } from './tutorials/openconvai';

export const tutorials: Tutorial[] = [
  registryBrokerTutorial,
  hcs14IdentityTutorial,
  hcs1InscriptionsTutorial,
  hcs2RegistriesTutorial,
  hcs5HashinalsTutorial,
  hcs11ProfilesTutorial,
  floraPetalsStateTutorial,
  hcs21AdaptersTutorial,
  hashnetMcpTutorial,
  openConvAiTutorial,
];
