import { useState, useEffect } from "preact/hooks";

import { ContainerState } from "./types";
import { getUserRepositories } from "./requests";

export default function useContainer() {
  const [state, _setState] =  useState<ContainerState>({
    user: null,
    username: "javierdwd",
    error: false,
    ignoreRepositories: [],
    useCache: true,
    cacheExpiration: 6,
  });

  const setState = (newState: Partial<ContainerState>) => {
    _setState((prev: ContainerState) => ({
      ...prev,
      ...newState
    }))
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserRepositories({
          useCache: state.useCache,
          cacheExpiration: state.cacheExpiration,
          ignoreRepositories: state.ignoreRepositories,
        });

        setState({
          error: false,
          user: data
        });
      } catch(error) {
        setState({ error: true });
      }
    })()
  }, [])

  return {
    user: state.user,
    username: state.username,
    error: state.error,
  };
};