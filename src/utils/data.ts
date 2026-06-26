import type { Catalog, Client, Partner, TeamMember } from '../types';
import { loadYaml } from './loadYaml';

export function getPartners(): Partner[] {
  return loadYaml<Partner[]>('partners.yaml');
}

export function getClients(): Client[] {
  return loadYaml<Client[]>('clients.yaml');
}

export function getTeam(): TeamMember[] {
  return loadYaml<TeamMember[]>('team.yaml');
}

export function getCatalogs(): Catalog[] {
  return loadYaml<Catalog[]>('catalogs.yaml');
}

export function getTeamByDepartment(department: TeamMember['department']): TeamMember[] {
  return getTeam().filter((member) => member.department === department);
}
