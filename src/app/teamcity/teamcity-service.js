const API_VER = '10.0';

export default class TeamcityService {

  constructor(dashboardApi) {
    this.dashboardApi = dashboardApi;
  }

  async getInvestigations(teamcityService, locator) {
    return await this.dashboardApi.fetch(
      teamcityService.id,
      `app/rest/${API_VER}/investigations`,
      {
        query: {
          locator: this.recursiveConvertHash(locator)
        }
      });
  }

  async getMyInvestigations(teamcityService) {
    return await this.getInvestigations(teamcityService, {
      state: 'TAKEN',
      assignee: 'current'
    });
  }

  async getProjectInvestigations(teamcityService, projectId) {
    return await this.getInvestigations(teamcityService, {
      affectedProject: {id: projectId}
    });
  }

  recursiveConvertHash = input => {
    return Object.
      entries(input).
      map(([key, val]) => {
        if (!val) {
          return null;
        } else if (typeof val === 'object') {
          return `${key}(${this.recursiveConvertHash(val)})`;
        } else if (Array.isArray(val)) {
          return `${key}(${val.map(this.recursiveConvertHash).join(',')})`;
        } else {
          return `${key}:${val}`;
        }
      }).
      filter(it => it).
      join(',');
  }
}
