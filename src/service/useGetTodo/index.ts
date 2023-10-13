import { useCallback } from "react";
import { RemoteService } from "../RemoteService";
import { ResultProps } from "./types";
import { useTodo } from "@/hooks/useTodo";

const useGetRiackAndMortyEpisodes = () => {
  const { taskTodo, setTaskTodo } = useTodo();
  const GetRiackAndMortyEpisodes = useCallback(async () => {
    try {
      setTaskTodo({
        called: false,
        loading: true,
      });

      const response = await RemoteService.request<ResultProps>({
        method: "GET",
        resource: "api/episode",
      });

      const result = response.data.results?.map((item) => {
        const episode = {
          id: item.id,
          name: item.name,
          air_date: item.air_date,
          episode: item.episode,
          characters: item.characters,
          url: item.url,
          created: item.created,
        };

        return episode;
      });

      setTaskTodo({
        data: {
          results: result || [],
        },
        called: false,
        loading: true,
      });
    } catch (err) {
      const error = err as any;
      setTaskTodo({
        called: true,
        loading: false,
        error: error.message,
      });
    }
  }, []);

  const { data, called, loading, error } = taskTodo;

  return {
    GetRiackAndMortyEpisodes,
    data,
    called,
    loading,
    error,
  };
};

export default useGetRiackAndMortyEpisodes;
