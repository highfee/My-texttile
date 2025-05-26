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
  DEFAULT_TEXT_ALIGN_VERTICAL,
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
    history: [[]],
    historyIndex: 0,
    imageBank: {}, // Stores { imageId: { id, url, originalWidth, originalHeight } }
    apparelBaseImages: {
      // Stores { view: url | null }
      front: null,
      back: null,
      left: null,
      right: null,
      arm: null,
    },
  };
};

const getInitialState = () => {
  const firstDesign = createNewDesign("My First Design");
  return {
    designs: [firstDesign],
    currentDesignId: firstDesign.id,
    selectedElementId: null,
    isLoading: false, // General loading state if needed
    isLoadingImage: false, // Specific for image uploads
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

          if (
            recordInHistory &&
            updates.elements !== undefined &&
            updates.elements !== currentDesign.elements
          ) {
            historyUpdates = updateHistoryForCurrentDesign(
              updates.elements || currentDesign.elements,
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
        setIsLoadingImage: (isLoading) => set({ isLoadingImage: isLoading }),

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

        // This action now expects a URL (e.g., from Cloudinary)
        setApparelBaseImage: ({ view, imageUrl }) => {
          modifyCurrentDesign((currentDesign) => {
            const newApparelBaseImages = {
              ...(currentDesign.apparelBaseImages || {
                front: null,
                back: null,
                left: null,
                right: null,
                arm: null,
              }),
              [view]: imageUrl, // Store the URL
            };
            return { apparelBaseImages: newApparelBaseImages };
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
                  textAlignVertical:
                    options?.textAlignVertical || DEFAULT_TEXT_ALIGN_VERTICAL,
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
                // When adding an image element, we use its imageId to reference it in the imageBank
                if (!options?.imageId)
                  throw new Error("Image ID is required for image element.");
                newElement = {
                  ...commonProps,
                  type: "image",
                  imageId: options.imageId,
                  imageUrl: options.imageUrl, // Store the direct URL on the element for easier rendering
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
            // Note: This does not delete the image from Cloudinary. That would require a backend call.
            // The image might remain in imageBank if not explicitly removed, but won't be used.
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

        // This action is called after an image is "uploaded" (simulated for now)
        // and we have its URL (from Cloudinary or temporary object URL).
        // It adds the image to the imageBank and then calls addElement.
        processAndAddImageElement: ({
          imageUrl,
          originalWidth,
          originalHeight,
        }) => {
          modifyCurrentDesign((currentDesign) => {
            const newImageId = generateId(); // Or use Cloudinary's public_id if available
            const newImageBank = {
              ...(currentDesign.imageBank || {}),
              [newImageId]: {
                id: newImageId,
                url: imageUrl,
                originalWidth,
                originalHeight,
              },
            };

            // Now call addElement with the imageId and imageUrl
            const newElementId = generateId();
            const currentElements = currentDesign.elements || [];
            const currentView = currentDesign.apparelView;

            const newImageElement = {
              id: newElementId,
              type: "image",
              x: 25,
              y: 25,
              width: originalWidth > 200 ? 200 : originalWidth,
              height:
                (originalWidth > 200 ? 200 : originalWidth) *
                (originalHeight / originalWidth),
              originalWidth: originalWidth,
              originalHeight: originalHeight,
              rotation: 0,
              zIndex: 0,
              imageId: newImageId, // Reference to imageBank
              imageUrl: imageUrl, // Direct URL for rendering
              associatedView: currentView,
            };
            let updatedElements = [...currentElements, newImageElement];
            updatedElements = assignZIndices(updatedElements);
            set({ selectedElementId: newElementId, isLoadingImage: false });
            return { elements: updatedElements, imageBank: newImageBank };
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
          // Before resetting, revoke any temporary object URLs stored in the current state
          const { designs } = get();
          designs.forEach((design) => {
            if (design.imageBank) {
              Object.values(design.imageBank).forEach((imageAsset) => {
                if (imageAsset.url && imageAsset.url.startsWith("blob:")) {
                  URL.revokeObjectURL(imageAsset.url);
                }
              });
            }
            if (design.apparelBaseImages) {
              Object.values(design.apparelBaseImages).forEach((url) => {
                if (url && url.startsWith("blob:")) {
                  URL.revokeObjectURL(url);
                }
              });
            }
          });
          set(getInitialState());
        },
      };
    },
    {
      name: "apparel-architect-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (rawStateParam, error) => {
        if (error) {
          console.error("Failed to rehydrate state from storage:", error);
          // Optionally, set to initial state on error
          // set(getInitialState());
          return;
        }

        let state = rawStateParam;
        if (!state) {
          // If storage is empty or invalid, initialize with default state.
          // set(getInitialState()); // Handled by persist returning undefined
          return;
        }

        // Migration logic for old data structures (e.g., from data URIs to URLs)
        // For this refactor, we'll assume new structures or simple defaults.
        // A full migration of data URIs to Cloudinary URLs would happen server-side
        // or as a separate migration script if you had live user data.

        if (state && state.designs) {
          state.designs = state.designs.map((design) => {
            const migratedDesign = { ...design };

            // Ensure apparelBaseImages exists and has all views
            migratedDesign.apparelBaseImages = {
              front: design.apparelBaseImages?.front || null,
              back: design.apparelBaseImages?.back || null,
              left: design.apparelBaseImages?.left || null,
              right: design.apparelBaseImages?.right || null,
              arm: design.apparelBaseImages?.arm || null,
            };

            // Ensure imageBank exists
            migratedDesign.imageBank = design.imageBank || {};

            // Ensure elements are correctly structured (example for future migrations)
            migratedDesign.elements = (design.elements || []).map((el) => {
              const migratedEl = { ...el };
              if (
                el.type === "image" &&
                !el.imageUrl &&
                el.imageId &&
                migratedDesign.imageBank[el.imageId]
              ) {
                // If imageUrl is missing but we have imageId and it's in imageBank, populate imageUrl
                migratedEl.imageUrl = migratedDesign.imageBank[el.imageId].url;
              }
              return migratedEl;
            });
            // Make sure history is an array of arrays of elements
            if (
              !migratedDesign.history ||
              !Array.isArray(migratedDesign.history) ||
              !migratedDesign.history.every(Array.isArray)
            ) {
              migratedDesign.history = [
                JSON.parse(JSON.stringify(migratedDesign.elements || [])),
              ];
              migratedDesign.historyIndex = 0;
            }
            if (
              typeof migratedDesign.historyIndex !== "number" ||
              migratedDesign.historyIndex >= migratedDesign.history.length
            ) {
              migratedDesign.historyIndex = Math.max(
                0,
                migratedDesign.history.length - 1
              );
            }

            return migratedDesign;
          });
          // Reset isLoadingImage on rehydration
          state.isLoadingImage = false;
        } else {
          // If designs array is missing, reset to a clean initial state
          const freshInitial = getInitialState();
          state.designs = freshInitial.designs;
          state.currentDesignId = freshInitial.currentDesignId;
          state.selectedElementId = null;
          state.isLoadingImage = false;
        }
      },
    }
  )
);

// Clean up object URLs when the window is about to unload
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    const { designs } = useDesignStore.getState();
    designs.forEach((design) => {
      if (design.imageBank) {
        Object.values(design.imageBank).forEach((imageAsset) => {
          if (imageAsset.url && imageAsset.url.startsWith("blob:")) {
            URL.revokeObjectURL(imageAsset.url);
          }
        });
      }
      if (design.apparelBaseImages) {
        Object.values(design.apparelBaseImages).forEach((url) => {
          if (url && url.startsWith("blob:")) {
            URL.revokeObjectURL(url);
          }
        });
      }
    });
  });
}

export default useDesignStore;
