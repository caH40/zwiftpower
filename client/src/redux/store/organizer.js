import organizerModeratorSlice from '../features/api/organizer/organizerModeratorSlice';
import clubsModeratorSlice from '../features/api/organizer/clubsModeratorSlice';

export const organizerReducers = {
  organizerModerator: organizerModeratorSlice,
  clubsModerator: clubsModeratorSlice,
};
