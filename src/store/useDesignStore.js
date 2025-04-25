// store/designStore.js
import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist } from "zustand/middleware";

export const useDesignStore = create(
  persist(
    (set, get) => ({
      // Canvas properties
      canvasSize: { width: 450, height: 425 },
      canvasBackground: "white",
      zoomLevel: 1,
      currentView: "front", // front, back, arm

      // Selected element
      selectedElement: null,

      // Design elements on canvas
      elements: [],

      // History for undo/redo
      history: [],
      historyIndex: -1,

      // Colors
      selectedProductColor: "#000000",

      // Active brand kit
      activeBrandKit: null,

      // Actions
      addElement: (elementType, properties) => {
        const element = {
          id: nanoid(),
          type: elementType,
          ...properties,
          draggable: true,
        };

        set((state) => {
          const newElements = [...state.elements, element];
          const newHistory = state.history.slice(0, state.historyIndex + 1);

          return {
            elements: newElements,
            history: [...newHistory, { elements: newElements }],
            historyIndex: state.historyIndex + 1,
            selectedElement: element.id,
          };
        });

        return element.id;
      },

      selectElement: (id) => {
        set({ selectedElement: id });
      },

      updateElement: (id, properties) => {
        set((state) => {
          const elements = state.elements.map((el) =>
            el.id === id ? { ...el, ...properties } : el
          );

          const newHistory = state.history.slice(0, state.historyIndex + 1);

          return {
            elements,
            history: [...newHistory, { elements }],
            historyIndex: state.historyIndex + 1,
          };
        });
      },

      deleteElement: (id) => {
        set((state) => {
          const elements = state.elements.filter((el) => el.id !== id);
          const newHistory = state.history.slice(0, state.historyIndex + 1);

          return {
            elements,
            selectedElement: null,
            history: [...newHistory, { elements }],
            historyIndex: state.historyIndex + 1,
          };
        });
      },

      clearCanvas: () => {
        set((state) => {
          const newHistory = state.history.slice(0, state.historyIndex + 1);

          return {
            elements: [],
            selectedElement: null,
            history: [...newHistory, { elements: [] }],
            historyIndex: state.historyIndex + 1,
          };
        });
      },

      // Undo and redo functions
      canUndo: () => get().historyIndex > 0,
      canRedo: () => get().historyIndex < get().history.length - 1,

      undo: () => {
        set((state) => {
          if (state.historyIndex > 0) {
            const newIndex = state.historyIndex - 1;
            return {
              elements: state.history[newIndex].elements,
              historyIndex: newIndex,
              selectedElement: null,
            };
          }
          return state;
        });
      },

      redo: () => {
        set((state) => {
          if (state.historyIndex < state.history.length - 1) {
            const newIndex = state.historyIndex + 1;
            return {
              elements: state.history[newIndex].elements,
              historyIndex: newIndex,
              selectedElement: null,
            };
          }
          return state;
        });
      },

      // Product color
      setProductColor: (color) => {
        set({ selectedProductColor: color });
      },

      // View switching
      setCurrentView: (view) => {
        set({ currentView: view });
      },

      // Zoom control
      setZoomLevel: (level) => {
        set({ zoomLevel: level });
      },

      // Brand kit
      setActiveBrandKit: (kitId) => {
        set({ activeBrandKit: kitId });
      },

      // Template handling
      applyTemplate: (template) => {
        set((state) => {
          const newHistory = state.history.slice(0, state.historyIndex + 1);

          return {
            elements: template.elements,
            selectedElement: null,
            history: [...newHistory, { elements: template.elements }],
            historyIndex: state.historyIndex + 1,
          };
        });
      },

      // Element position
      bringForward: (id) => {
        set((state) => {
          const elements = [...state.elements];
          const index = elements.findIndex((el) => el.id === id);

          if (index < elements.length - 1) {
            const element = elements[index];
            elements.splice(index, 1);
            elements.splice(index + 1, 0, element);

            const newHistory = state.history.slice(0, state.historyIndex + 1);

            return {
              elements,
              history: [...newHistory, { elements }],
              historyIndex: state.historyIndex + 1,
            };
          }

          return state;
        });
      },

      sendBackward: (id) => {
        set((state) => {
          const elements = [...state.elements];
          const index = elements.findIndex((el) => el.id === id);

          if (index > 0) {
            const element = elements[index];
            elements.splice(index, 1);
            elements.splice(index - 1, 0, element);

            const newHistory = state.history.slice(0, state.historyIndex + 1);

            return {
              elements,
              history: [...newHistory, { elements }],
              historyIndex: state.historyIndex + 1,
            };
          }

          return state;
        });
      },

      // Text alignment functions
      alignElementLeft: (id) => {
        set((state) => {
          const elements = state.elements.map((el) =>
            el.id === id ? { ...el, align: "left" } : el
          );

          const newHistory = state.history.slice(0, state.historyIndex + 1);

          return {
            elements,
            history: [...newHistory, { elements }],
            historyIndex: state.historyIndex + 1,
          };
        });
      },

      alignElementCenter: (id) => {
        set((state) => {
          const elements = state.elements.map((el) =>
            el.id === id ? { ...el, align: "center" } : el
          );

          const newHistory = state.history.slice(0, state.historyIndex + 1);

          return {
            elements,
            history: [...newHistory, { elements }],
            historyIndex: state.historyIndex + 1,
          };
        });
      },

      alignElementRight: (id) => {
        set((state) => {
          const elements = state.elements.map((el) =>
            el.id === id ? { ...el, align: "right" } : el
          );

          const newHistory = state.history.slice(0, state.historyIndex + 1);

          return {
            elements,
            history: [...newHistory, { elements }],
            historyIndex: state.historyIndex + 1,
          };
        });
      },

      // Add rotation function
      rotateElement: (id, degrees) => {
        set((state) => {
          const elements = state.elements.map((el) => {
            if (el.id === id) {
              const currentRotation = el.rotation || 0;
              return { ...el, rotation: currentRotation + degrees };
            }
            return el;
          });

          const newHistory = state.history.slice(0, state.historyIndex + 1);

          return {
            elements,
            history: [...newHistory, { elements }],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
    }),
    {
      name: "design-storage",
      partialize: (state) => ({
        elements: state.elements,
        canvasBackground: state.canvasBackground,
        selectedProductColor: state.selectedProductColor,
        currentView: state.currentView,
      }),
    }
  )
);
