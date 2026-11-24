import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Season } from "@/types/season";
import { seasons } from "@/data/seasons";

interface SeasonsState {
  items: Season[];
  filter: "all" | "completed" | "upcoming";
  searchQuery: string;
  selectedSeasonSlug: string | null;
}

const initialState: SeasonsState = {
  items: seasons,
  filter: "all",
  searchQuery: "",
  selectedSeasonSlug: null,
};

export const seasonsSlice = createSlice({
  name: "seasons",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<"all" | "completed" | "upcoming">) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedSeason: (state, action: PayloadAction<string | null>) => {
      state.selectedSeasonSlug = action.payload;
    },
  },
});

export const { setFilter, setSearchQuery, setSelectedSeason } = seasonsSlice.actions;
export default seasonsSlice.reducer;
