// store/useDesignStore.js
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState = {
  product: {
    type: "tshirt",
    color: "#FFFFFF",
    size: "M",
    variant: "unisex",
    view: "front", // 'front', 'back', 'left', 'right'
    mockup: null,
  },
  canvas: {
    width: 800,
    height: 600,
    zoom: 100,
    offsetX: 0,
    offsetY: 0,
  },
  elements: [],
  brandKit: {
    logos: {
      main: null,
      alternative: null,
      transparent: null,
    },
    colors: [],
    fonts: ["Helvetica"],
    templates: [],
  },
  ui: {
    activeTool: null,
    activePanel: "design",
    isLoading: false,
    isSaving: false,
    error: null,
  },
  history: {
    past: [],
    present: null,
    future: [],
  },
  selectedElements: [],
  groups: {},
};

const createHistorySnapshot = (state) => ({
  product: JSON.parse(JSON.stringify(state.product)),
  elements: JSON.parse(JSON.stringify(state.elements)),
  canvas: JSON.parse(JSON.stringify(state.canvas)),
});

const useDesignStore = create(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,

        actions: {
          // Product actions
          setProductColor: (color) =>
            set((state) => {
              state.product.color = color;
              state.history.past.push(createHistorySnapshot(state));
            }),

          setProductView: (view) =>
            set((state) => {
              state.product.view = view;
              // Reset canvas position for new view
              state.canvas.offsetX = 0;
              state.canvas.offsetY = 0;
              state.history.past.push(createHistorySnapshot(state));
            }),

          uploadMockup: (file) => {
            const reader = new FileReader();
            reader.onload = () =>
              set((state) => {
                state.product.mockup = reader.result;
                state.history.past.push(createHistorySnapshot(state));
              });
            reader.readAsDataURL(file);
          },

          // Canvas actions
          setCanvasZoom: (zoom) =>
            set((state) => {
              state.canvas.zoom = zoom;
            }),

          panCanvas: (dx, dy) =>
            set((state) => {
              state.canvas.offsetX += dx;
              state.canvas.offsetY += dy;
            }),

          // Element actions
          addElement: (element) =>
            set((state) => {
              const newElement = {
                ...element,
                id: crypto.randomUUID(),
                view: state.product.view, // Track which view the element belongs to
                createdAt: Date.now(),
              };
              state.elements.push(newElement);
              state.selectedElements = [newElement.id];
              state.history.past.push(createHistorySnapshot(state));
            }),

          updateElement: (id, updates) =>
            set((state) => {
              const element = state.elements.find((el) => el.id === id);
              if (element) {
                Object.assign(element, updates);
                state.history.past.push(createHistorySnapshot(state));
              }
            }),

          deleteElement: (id) =>
            set((state) => {
              state.elements = state.elements.filter((el) => el.id !== id);
              state.selectedElements = state.selectedElements.filter(
                (elId) => elId !== id
              );
              state.history.past.push(createHistorySnapshot(state));
            }),

          // View-specific elements filter
          getViewElements: () => {
            const currentView = get().product.view;
            return get().elements.filter((el) => el.view === currentView);
          },

          // Multi-select
          selectElement: (id) =>
            set((state) => {
              state.selectedElements = [id];
            }),

          addToSelection: (id) =>
            set((state) => {
              if (!state.selectedElements.includes(id)) {
                state.selectedElements.push(id);
              }
            }),

          clearSelection: () =>
            set((state) => {
              state.selectedElements = [];
            }),

          // History management
          undo: () =>
            set((state) => {
              if (state.history.past.length === 0) return;
              const snapshot = state.history.past.pop();
              state.history.future.push(createHistorySnapshot(state));
              Object.assign(state, snapshot);
            }),

          redo: () =>
            set((state) => {
              if (state.history.future.length === 0) return;
              const snapshot = state.history.future.pop();
              state.history.past.push(createHistorySnapshot(state));
              Object.assign(state, snapshot);
            }),

          // Brand kit actions
          uploadLogo: (type, file) => {
            const reader = new FileReader();
            reader.onload = () =>
              set((state) => {
                state.brandKit.logos[type] = reader.result;
              });
            reader.readAsDataURL(file);
          },

          applyBrandColor: (color) =>
            set((state) => {
              state.product.color = color;
              state.history.past.push(createHistorySnapshot(state));
            }),

          // Async operations
          saveDesign: async (name) => {
            try {
              set((state) => {
                state.ui.isSaving = true;
              });

              const design = {
                name,
                ...createHistorySnapshot(get()),
                createdAt: new Date().toISOString(),
              };

              // Simulate API call
              await new Promise((resolve) => setTimeout(resolve, 1000));

              set((state) => {
                state.ui.isSaving = false;
                state.brandKit.templates.push(design);
              });
            } catch (error) {
              set((state) => {
                state.ui.error = error.message;
                state.ui.isSaving = false;
              });
            }
          },

          reset: () =>
            set((state) => {
              Object.assign(state, initialState);
            }),
        },
      })),
      {
        name: "design-store-v2",
        partialize: (state) => ({
          product: state.product,
          elements: state.elements,
          brandKit: state.brandKit,
        }),
        version: 2,
        migrate: (persistedState, version) => {
          if (version < 2) {
            // Migration logic for previous versions
            persistedState.product.view = "front";
            persistedState.selectedElements = [];
          }
          return persistedState;
        },
      }
    )
  )
);

// Hook aliases for better DX
export const useProduct = () => useDesignStore((state) => state.product);
export const useCanvas = () => useDesignStore((state) => state.canvas);
export const useElements = () =>
  useDesignStore((state) => state.actions.getViewElements());
export const useSelectedElements = () =>
  useDesignStore((state) => state.selectedElements);
export const useBrandKit = () => useDesignStore((state) => state.brandKit);
export const useDesignActions = () => useDesignStore((state) => state.actions);
