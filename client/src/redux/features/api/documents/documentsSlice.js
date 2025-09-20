import { createSlice } from '@reduxjs/toolkit';

import { fetchDocument, fetchDocuments } from './fetchDocuments';

const initialState = {
  documents: [],
  document: null,
  message: null,
  status: null,
  error: null,
};

/**
 * Редукторы для работы с сущностью Команда.
 */
const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    resetDocuments: (state) => {
      state.documents = [];
    },
    resetDocument: (state) => {
      state.document = [];
    },
  },

  extraReducers: (builder) => {
    // ============== получение списка документов =================
    builder.addCase(fetchDocuments.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchDocuments.fulfilled, (state, action) => {
      state.documents = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchDocuments.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
    // ============== получение списка документов =================
    builder.addCase(fetchDocument.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    });

    builder.addCase(fetchDocument.fulfilled, (state, action) => {
      state.document = action.payload.data;
      state.error = null;
      state.status = 'resolved';
    });

    builder.addCase(fetchDocument.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export const { resetDocuments, resetDocument } = documentsSlice.actions;

export default documentsSlice.reducer;
