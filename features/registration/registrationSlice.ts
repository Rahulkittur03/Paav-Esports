import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RegistrationFormData,
  RegistrationErrors,
  DemoSubmissionReceipt,
  RosterPlayer,
} from "@/types/registration";

const initialRoster: RosterPlayer[] = [
  { id: "p1", fullName: "", inGameId: "", currentRank: "Silver", role: "Duelist", isCaptain: true },
  { id: "p2", fullName: "", inGameId: "", currentRank: "Silver", role: "Initiator" },
  { id: "p3", fullName: "", inGameId: "", currentRank: "Silver", role: "Controller" },
  { id: "p4", fullName: "", inGameId: "", currentRank: "Bronze", role: "Sentinel" },
  { id: "p5", fullName: "", inGameId: "", currentRank: "Bronze", role: "Duelist" },
  { id: "p6", fullName: "", inGameId: "", currentRank: "Bronze", role: "Substitute" },
];

const initialFormData: RegistrationFormData = {
  entryType: "team",
  membershipType: "paav_gang_silver",
  teamName: "",
  teamTag: "",
  teamLeaderName: "",
  contactNumber: "",
  email: "",
  discordId: "",
  gameDiscipline: "Valorant (Paav Showdown)",
  region: "India / South Asia (Mumbai Server)",
  agreedToRules: false,
  roster: initialRoster,
};

interface RegistrationState {
  formData: RegistrationFormData;
  errors: RegistrationErrors;
  status: "idle" | "submitting" | "demo_success" | "demo_error";
  receipt: DemoSubmissionReceipt | null;
}

const initialState: RegistrationState = {
  formData: initialFormData,
  errors: {},
  status: "idle",
  receipt: null,
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof Omit<RegistrationFormData, "roster">; value: string | boolean }>
    ) => {
      // @ts-expect-error dynamic key assignment
      state.formData[action.payload.field] = action.payload.value;
      if (state.errors[action.payload.field]) {
        delete state.errors[action.payload.field];
      }
    },
    updateRosterPlayer: (
      state,
      action: PayloadAction<{ index: number; field: keyof RosterPlayer; value: string }>
    ) => {
      const { index, field, value } = action.payload;
      if (state.formData.roster[index]) {
        // @ts-expect-error dynamic assign on roster player
        state.formData.roster[index][field] = value;
        const errKey = `roster_${index}_${field}`;
        if (state.errors[errKey]) {
          delete state.errors[errKey];
        }
      }
    },
    addSubstitute: (state) => {
      if (state.formData.roster.length < 7) {
        state.formData.roster.push({
          id: `p${state.formData.roster.length + 1}`,
          fullName: "",
          inGameId: "",
          currentRank: "Silver",
          role: "Substitute",
        });
      }
    },
    removeSubstitute: (state, action: PayloadAction<number>) => {
      if (action.payload >= 5 && state.formData.roster.length > 5) {
        state.formData.roster.splice(action.payload, 1);
      }
    },
    setErrors: (state, action: PayloadAction<RegistrationErrors>) => {
      state.errors = action.payload;
      state.status = "idle";
    },
    clearError: (state, action: PayloadAction<string>) => {
      delete state.errors[action.payload];
    },
    submitDemoStart: (state) => {
      state.status = "submitting";
      state.errors = {};
    },
    submitDemoSuccess: (state, action: PayloadAction<DemoSubmissionReceipt>) => {
      state.status = "demo_success";
      state.receipt = action.payload;
    },
    submitDemoError: (state) => {
      state.status = "demo_error";
    },
    resetRegistration: (state) => {
      state.formData = initialFormData;
      state.errors = {};
      state.status = "idle";
      state.receipt = null;
    },
  },
});

export const {
  updateField,
  updateRosterPlayer,
  addSubstitute,
  removeSubstitute,
  setErrors,
  clearError,
  submitDemoStart,
  submitDemoSuccess,
  submitDemoError,
  resetRegistration,
} = registrationSlice.actions;

export default registrationSlice.reducer;
