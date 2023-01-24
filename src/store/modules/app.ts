import { defineStore } from "pinia";
import type { DeepPartial } from "unocss";
import type { MenuSetting, ProjectConfig } from "../../../types/config";
import { deepMerge } from "~/utils";
import { PROJECT_CONFIG_KEY } from "~/constant/storageConstant";

interface AppState {
  // project config
  projectConfig: ProjectConfig | null;
}

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState =>
    useLocalStorage(
      PROJECT_CONFIG_KEY,
      {
        projectConfig: {
          menuSetting: {
            collapsed: false,
          },
        },
      }).value,
  getters: {
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },

    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
  },
  actions: {
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      useLocalStorage(PROJECT_CONFIG_KEY, this.projectConfig);
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
