"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  DEFAULT_APPAREL_COLOR,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_ELEMENT_COLOR,
  INITIAL_ELEMENT_WIDTH,
  INITIAL_ELEMENT_HEIGHT,
  INITIAL_SHAPE_SIZE,
  DEFAULT_TEXT_ALIGN,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_FONT_STYLE,
} from "@/constants/index";

// Helpers
const generateId = () => Math.random().toString(36).substr(2, 9);
const MAX_HISTORY_LENGTH = 50;

const assignZIndices = (elements) => {
  return elements.map((el, index) => ({ ...el, zIndex: index }));
};

const createNewDesign = (name) => {
  const id = generateId();
  return {
    id,
    name: name || `Design ${id.substring(0, 4)}`,
    apparelType: "tshirt",
    apparelColor: DEFAULT_APPAREL_COLOR,
    apparelView: "front",
    elements: [],
    history: [[]], // Initial history with empty elements
    historyIndex: 0,
  };
};

const getInitialState = () => {
  const firstDesign = createNewDesign("My First Design");
  return {
    designs: [firstDesign],
    currentDesignId: firstDesign.id,
    selectedElementId: null,
    isLoading: false,
  };
};

const useDesignStore = create(
  persist(
    (set, get) => {
      const updateHistoryForCurrentDesign = (
        newElementsState,
        currentDesign
      ) => {
        const newHistoryEntry = JSON.parse(JSON.stringify(newElementsState));
        let newHistory = [
          ...(currentDesign.history || [[]]).slice(
            0,
            (currentDesign.historyIndex || 0) + 1
          ),
          newHistoryEntry,
        ];
        if (newHistory.length > MAX_HISTORY_LENGTH) {
          newHistory = newHistory.slice(newHistory.length - MAX_HISTORY_LENGTH);
        }
        return { history: newHistory, historyIndex: newHistory.length - 1 };
      };

      const modifyCurrentDesign = (updater, recordInHistory = true) => {
        set((state) => {
          const currentDesign = state.designs.find(
            (d) => d.id === state.currentDesignId
          );
          if (!currentDesign) return state;

          const updates = updater(currentDesign);
          let historyUpdates = {};

          if (recordInHistory) {
            const elementsToRecord =
              updates.elements !== undefined
                ? updates.elements
                : currentDesign.elements;
            historyUpdates = updateHistoryForCurrentDesign(
              elementsToRecord || [],
              currentDesign
            );
          }

          const updatedDesigns = state.designs.map((d) =>
            d.id === state.currentDesignId
              ? { ...d, ...updates, ...historyUpdates }
              : d
          );
          return { ...state, designs: updatedDesigns };
        });
      };

      return {
        ...getInitialState(),

        addDesign: ({ name }) => {
          const newDesign = createNewDesign(name);
          set((state) => ({
            designs: [...state.designs, newDesign],
            currentDesignId: newDesign.id,
            selectedElementId: null,
          }));
        },

        switchDesign: ({ designId }) => {
          set({ currentDesignId: designId, selectedElementId: null });
        },

        deleteDesign: ({ designId }) => {
          set((state) => {
            let remainingDesigns = state.designs.filter(
              (d) => d.id !== designId
            );
            let newCurrentDesignId = state.currentDesignId;

            if (remainingDesigns.length === 0) {
              const defaultNewDesign = createNewDesign("My First Design");
              remainingDesigns = [defaultNewDesign];
              newCurrentDesignId = defaultNewDesign.id;
            } else if (state.currentDesignId === designId) {
              newCurrentDesignId = remainingDesigns[0].id;
            }
            return {
              designs: remainingDesigns,
              currentDesignId: newCurrentDesignId,
              selectedElementId: null,
            };
          });
        },

        renameDesign: ({ designId, newName }) => {
          set((state) => ({
            designs: state.designs.map((d) =>
              d.id === designId ? { ...d, name: newName } : d
            ),
          }));
        },

        updateApparelType: ({ apparelType }) =>
          modifyCurrentDesign(() => ({ apparelType }), false),
        updateApparelColor: ({ color }) =>
          modifyCurrentDesign(() => ({ apparelColor: color }), false),

        updateApparelView: ({ view }) => {
          modifyCurrentDesign((currentDesign) => {
            const selectedElement = currentDesign.elements?.find(
              (el) => el.id === get().selectedElementId
            );
            if (selectedElement && selectedElement.associatedView !== view) {
              set({ selectedElementId: null });
            }
            return { apparelView: view };
          }, false);
        },

        addElement: ({ type, options }) => {
          modifyCurrentDesign((currentDesign) => {
            const newElementId = generateId();
            let newElement;
            const currentElements = currentDesign.elements || [];
            const currentView = currentDesign.apparelView;

            const commonProps = {
              id: newElementId,
              x: 25,
              y: 25,
              rotation: 0,
              zIndex: 0,
              associatedView: currentView,
              ...options,
            };

            switch (type) {
              case "text":
                newElement = {
                  ...commonProps,
                  type: "text",
                  text: options?.text || "New Text",
                  fontFamily: options?.fontFamily || DEFAULT_FONT_FAMILY,
                  fontSize: options?.fontSize || DEFAULT_FONT_SIZE,
                  color: options?.color || DEFAULT_ELEMENT_COLOR,
                  width: options?.width || INITIAL_ELEMENT_WIDTH,
                  height: options?.height || INITIAL_ELEMENT_HEIGHT,
                  textAlign: options?.textAlign || DEFAULT_TEXT_ALIGN,
                  fontWeight: options?.fontWeight || DEFAULT_FONT_WEIGHT,
                  fontStyle: options?.fontStyle || DEFAULT_FONT_STYLE,
                };
                break;
              case "shape":
                newElement = {
                  ...commonProps,
                  type: "shape",
                  shapeType: options?.shapeType || "square",
                  color: options?.color || DEFAULT_ELEMENT_COLOR,
                  width: options?.width || INITIAL_SHAPE_SIZE,
                  height: options?.height || INITIAL_SHAPE_SIZE,
                };
                break;
              case "image":
                if (!options?.imageUrl)
                  throw new Error("Image URL is required for image element.");
                newElement = {
                  ...commonProps,
                  type: "image",
                  imageUrl: options.imageUrl,
                  width: options.width || INITIAL_ELEMENT_WIDTH,
                  height: options.height || INITIAL_ELEMENT_HEIGHT,
                  originalWidth: options.originalWidth,
                  originalHeight: options.originalHeight,
                };
                break;
              default:
                throw new Error("Invalid element type");
            }

            let updatedElements = [...currentElements, newElement];
            updatedElements = assignZIndices(updatedElements);
            set({ selectedElementId: newElementId });
            return { elements: updatedElements };
          });
        },

        updateElement: ({ elementId, updates }) => {
          modifyCurrentDesign((currentDesign) => {
            const updatedElements = (currentDesign.elements || []).map((el) =>
              el.id === elementId ? { ...el, ...updates } : el
            );
            return { elements: updatedElements };
          });
        },

        deleteElement: ({ elementId }) => {
          modifyCurrentDesign((currentDesign) => {
            let updatedElements = (currentDesign.elements || []).filter(
              (el) => el.id !== elementId
            );
            updatedElements = assignZIndices(updatedElements);
            if (get().selectedElementId === elementId) {
              set({ selectedElementId: null });
            }
            return { elements: updatedElements };
          });
        },

        selectElement: ({ elementId }) => set({ selectedElementId: elementId }),

        undo: () => {
          modifyCurrentDesign((currentDesign) => {
            if (!currentDesign || (currentDesign.historyIndex || 0) <= 0)
              return {};
            const newHistoryIndex = (currentDesign.historyIndex || 0) - 1;
            const elementsFromHistory = JSON.parse(
              JSON.stringify(currentDesign.history[newHistoryIndex])
            );
            return {
              elements: assignZIndices(elementsFromHistory),
              historyIndex: newHistoryIndex,
            };
          }, false);
        },

        redo: () => {
          modifyCurrentDesign((currentDesign) => {
            if (
              !currentDesign ||
              (currentDesign.historyIndex || 0) >=
                (currentDesign.history || []).length - 1
            )
              return {};
            const newHistoryIndex = (currentDesign.historyIndex || 0) + 1;
            const elementsFromHistory = JSON.parse(
              JSON.stringify(currentDesign.history[newHistoryIndex])
            );
            return {
              elements: assignZIndices(elementsFromHistory),
              historyIndex: newHistoryIndex,
            };
          }, false);
        },

        loadImage: ({ imageUrl, width, height }) => {
          modifyCurrentDesign((currentDesign) => {
            const newElementId = generateId();
            const currentElements = currentDesign.elements || [];
            const currentView = currentDesign.apparelView;
            const newImageElement = {
              id: newElementId,
              type: "image",
              x: 25,
              y: 25,
              width: width > 200 ? 200 : width,
              height: (width > 200 ? 200 : width) * (height / width),
              originalWidth: width,
              originalHeight: height,
              rotation: 0,
              imageUrl: imageUrl,
              zIndex: 0,
              associatedView: currentView,
            };
            let updatedElements = [...currentElements, newImageElement];
            updatedElements = assignZIndices(updatedElements);
            set({ selectedElementId: newElementId, isLoading: false });
            return { elements: updatedElements };
          });
        },

        bringElementToFront: ({ elementId }) => {
          modifyCurrentDesign((currentDesign) => {
            const elements = [...(currentDesign.elements || [])];
            const elementToMove = elements.find((el) => el.id === elementId);
            if (!elementToMove) return {};
            let reorderedElements = elements.filter(
              (el) => el.id !== elementId
            );
            reorderedElements.push(elementToMove);
            return { elements: assignZIndices(reorderedElements) };
          });
        },
        sendElementToBack: ({ elementId }) => {
          modifyCurrentDesign((currentDesign) => {
            const elements = [...(currentDesign.elements || [])];
            const elementToMove = elements.find((el) => el.id === elementId);
            if (!elementToMove) return {};
            let reorderedElements = elements.filter(
              (el) => el.id !== elementId
            );
            reorderedElements.unshift(elementToMove);
            return { elements: assignZIndices(reorderedElements) };
          });
        },
        bringElementForward: ({ elementId }) => {
          modifyCurrentDesign((currentDesign) => {
            const elements = [...(currentDesign.elements || [])];
            const index = elements.findIndex((el) => el.id === elementId);
            if (index === -1 || index === elements.length - 1) return {};
            const temp = elements[index];
            elements[index] = elements[index + 1];
            elements[index + 1] = temp;
            return { elements: assignZIndices(elements) };
          });
        },
        sendElementBackward: ({ elementId }) => {
          modifyCurrentDesign((currentDesign) => {
            const elements = [...(currentDesign.elements || [])];
            const index = elements.findIndex((el) => el.id === elementId);
            if (index === -1 || index === 0) return {};
            const temp = elements[index];
            elements[index] = elements[index - 1];
            elements[index - 1] = temp;
            return { elements: assignZIndices(elements) };
          });
        },
        resetStateAndStorage: () => {
          set(getInitialState());
        },
      };
    },
    {
      name: "design-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (rawState, error) => {
        if (error) {
          console.error("Failed to rehydrate state from storage:", error);
          set(getInitialState());
          return;
        }

        let state = rawState;

        if (state) {
          let needsPersistUpdate = false;

          if (!state.designs || state.designs.length === 0) {
            const freshInitial = getInitialState();
            state.designs = freshInitial.designs;
            state.currentDesignId = freshInitial.currentDesignId;
            needsPersistUpdate = true;
          } else if (
            !state.currentDesignId ||
            !state.designs.find((d) => d.id === state.currentDesignId)
          ) {
            state.currentDesignId = state.designs[0].id;
            needsPersistUpdate = true;
          }

          state.designs = state.designs.map((design) => {
            const designDefaultView = design.apparelView || "front";

            const migrateElements = (elementsArray) => {
              return elementsArray.map((el) => {
                if (el.associatedView === undefined) {
                  needsPersistUpdate = true;
                  return { ...el, associatedView: designDefaultView };
                }
                return el;
              });
            };

            const migratedElements = migrateElements(design.elements || []);

            const migratedHistory = (
              design.history || [[JSON.parse(JSON.stringify(migratedElements))]]
            ).map((historyEntry) => migrateElements(historyEntry));

            const historyIndex =
              design.historyIndex !== undefined
                ? Math.min(design.historyIndex, migratedHistory.length - 1)
                : migratedHistory.length - 1;

            if (!design.elements) needsPersistUpdate = true;
            if (!design.history || design.history.length === 0)
              needsPersistUpdate = true;
            if (design.historyIndex === undefined) needsPersistUpdate = true;

            return {
              ...design,
              elements: migratedElements,
              history: migratedHistory,
              historyIndex: historyIndex,
              apparelView: designDefaultView,
            };
          });

          if (needsPersistUpdate) {
          }
        } else {
          set(getInitialState());
        }
      },
    }
  )
);

export default useDesignStore;
