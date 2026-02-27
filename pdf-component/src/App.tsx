import React from "react";
import { Component } from "react";

import {
    PdfLoader,
    PdfHighlighter,
    Tip,
    Highlight,
    Popup,
    AreaHighlight,
    IHighlight,
    NewHighlight,
} from "./react-pdf-highlighter";

import { Spinner } from "./Spinner";

import "./style/App.css";

interface RedactionHighLight extends IHighlight {
    redactionType: string;
  }

interface State {
    url: string;
    highlights: Array<RedactionHighLight>;
    isRedactionComplete: boolean;
    matches: Array<RedactionHighLight>;
    currentMatchIndex: number;
}

const testHighlights: Record<string, Array<RedactionHighLight>> = {}
const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
    document.location.hash.slice("#highlight-".length);

const resetHash = () => {
    document.location.hash = "";
};

const HighlightPopup = ({
    comment,
    onClick,
}: {
    comment: { text: string; emoji: string };
    onClick: () => void;
}) => (
    //true ? (
    // <div className="Highlight__popup">
    //   {comment.emoji} {comment.text}
    // </div>
    <div className="Tip">
        <div className="Tip__compact Tip__compact-unredact" onClick={onClick}>
            Remove redaction
        </div>
    </div>
);
//) : null;

//const PRIMARY_PDF_URL = "response2.pdf";
// const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";
const PRIMARY_PDF_URL =
    document?.getElementById("pdf-root")?.getAttribute("data-pdf-url") || "";
//"https://sarumpolespike.blob.core.windows.net/rumpole/123/pdfs/101.pdf?sv=2020-08-04&se=2024-02-14T11%3A37%3A19Z&sr=b&sp=r&rsct=application%2Fpdf&sig=v5zNZ%2BJNkib7HT5%2BK2cTbS%2B%2FlnYkcfmNU3Qj5ZiBHrc%3D";

const searchParams = new URLSearchParams(document.location.search);

const initialUrl = searchParams.get("url") || PRIMARY_PDF_URL;

class App extends Component<{}, State> {
    private containerRef: React.RefObject<HTMLDivElement>;

    constructor(props: {}) {
        super(props);
        this.containerRef = React.createRef();
    }

    state: State = {
        url: initialUrl,
        highlights: testHighlights[initialUrl]
            ? [...testHighlights[initialUrl]]
            : [],
        isRedactionComplete: false,
        matches: [],
        currentMatchIndex: 0,
    };

    resetHighlights = () => {
        this.setState({
            highlights: [],
        });
    };

    setRedactionComplete = () => {
        this.setState({ isRedactionComplete: true });
    };

    // toggleDocument = () => {
    //   const newUrl =
    //     this.state.url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;

    //   this.setState({
    //     url: newUrl,
    //     highlights: testHighlights[newUrl] ? [...testHighlights[newUrl]] : [],
    //   });
    // };

    scrollViewerTo = (highlight: any) => {};

    handleFindMatching = async (text: string, pdfDocument: any) => {
        const matches: Array<RedactionHighLight> = [];
        const searchText = text.trim();
        if (!searchText) return;

        for (let i = 1; i <= pdfDocument.numPages; i++) {
            const page = await pdfDocument.getPage(i);
            const textContent = await page.getTextContent();
            const viewport = page.getViewport({ scale: 1 });

            textContent.items.forEach((item: any) => {
                if (item.str.toLowerCase().includes(searchText.toLowerCase())) {
                    const [scaleX, skewX, skewY, scaleY, x, y] = item.transform;
                    
                    const width = item.width;
                    const height = item.height;

                    const scaledItem = {
                        x1: x,
                        y1: y,
                        x2: x + width,
                        y2: y + height,
                        width: viewport.width,
                        height: viewport.height,
                        pageNumber: i
                    };

                    matches.push({
                        id: getNextId(),
                        content: { text: item.str },
                        position: {
                            boundingRect: scaledItem,
                            rects: [scaledItem],
                            pageNumber: i,
                            usePdfCoordinates: true
                        },
                        comment: { text: "", emoji: "" },
                        redactionType: ""
                    });
                }
            });
        }
        this.setState({ matches, currentMatchIndex: 0 });
        if (matches.length > 0) {
            this.scrollViewerTo(matches[0]);
        }
    };

    handleNextMatch = () => {
        const { matches, currentMatchIndex } = this.state;
        if (matches.length === 0) return;
        const nextIndex = (currentMatchIndex + 1) % matches.length;
        this.setState({ currentMatchIndex: nextIndex });
        this.scrollViewerTo(matches[nextIndex]);
    };

    handlePreviousMatch = () => {
        const { matches, currentMatchIndex } = this.state;
        if (matches.length === 0) return;
        const prevIndex = (currentMatchIndex - 1 + matches.length) % matches.length;
        this.setState({ currentMatchIndex: prevIndex });
        this.scrollViewerTo(matches[prevIndex]);
    };

    scrollToHighlightFromHash = () => {
        const highlight = this.getHighlightById(parseIdFromHash());

        if (highlight) {
            this.scrollViewerTo(highlight);
        }
    };

    componentDidMount() {
        window.addEventListener(
            "hashchange",
            this.scrollToHighlightFromHash,
            false
        );
    }

    getHighlightById(id: string) {
        const { highlights } = this.state;

        return highlights.find((highlight) => highlight.id === id);
    }

    addHighlight(highlight: NewHighlight & { redactionType: string }) {
        const { highlights } = this.state;

        console.log("Saving highlight", highlight);

        this.setState({
            highlights: [...highlights, { ...highlight, id: getNextId() }],
        });
    }

    updateHighlight(highlightId: string, position: Object, content: Object) {
        console.log("Updating highlight", highlightId, position, content);

        this.setState({
            highlights: this.state.highlights.map((h) => {
                const {
                    id,
                    position: originalPosition,
                    content: originalContent,
                    ...rest
                } = h;
                return id === highlightId
                    ? {
                          id,
                          position: { ...originalPosition, ...position },
                          content: { ...originalContent, ...content },
                          ...rest,
                      }
                    : h;
            }),
        });
    }

    removeHighlight = (id: string) => {
        this.setState({
            highlights: this.state.highlights.filter((item) => item.id !== id),
        });
    };

    render() {
        const { url, highlights, isRedactionComplete, matches, currentMatchIndex } = this.state;
        const currentMatch = matches[currentMatchIndex];
        const displayHighlights = currentMatch ? [...highlights, currentMatch] : highlights;

        return (
            <>
                {!!highlights.length && !isRedactionComplete && (
                    <div
                        className="redaction-footer"
                        style={{
                            width:
                                (this.containerRef.current?.clientWidth ?? 0) -
                                2,
                        }}
                    >
                        <span className="removeRedactions looks-like-a-link-underline">
                            Remove all redactions
                        </span>
                        <span id="data-count" data-count={highlights.length}>
                            {highlights.length === 1
                                ? "There is 1 redaction"
                                : `There are ${highlights.length} redactions`}
                        </span>

                        <button
                            className="govuk-button saveAndFinishButton"
                            onClick={() => {
                                (window as any).openModal2();
                                (window as any).savedHighlights = this.state.highlights;
                                this.setRedactionComplete()
                            }}
                        >
                            Save all redactions
                        </button>
                    </div>
                )}
                <div
                    ref={this.containerRef}
                    style={{
                        height: "100%",
                        width: "100%",
                        position: "relative",
                    }}
                >
                    <PdfLoader url={url} beforeLoad={<Spinner />}>
                        {(pdfDocument) => (
                            <PdfHighlighter
                                pdfDocument={pdfDocument}
                                enableAreaSelection={(event) => {
                                    return (
                                        (event.target as HTMLElement)
                                            .className === "textLayer"
                                    ); //event.altKey;
                                }}
                                onScrollChange={resetHash}
                                pdfScaleValue="page-width"
                                scrollRef={(scrollTo) => {
                                    this.scrollViewerTo = scrollTo;

                                    this.scrollToHighlightFromHash();
                                }}
                                onSelectionFinished={(
                                    position,
                                    content,
                                    hideTipAndSelection,
                                    transformSelection
                                ) => (
                                    <Tip
                                        onOpen={transformSelection}
                                        content={content}
                                        matchCount={this.state.matches.length}
                                        currentMatchIndex={this.state.currentMatchIndex}
                                        onFindMatching={(text) => this.handleFindMatching(text, pdfDocument)}
                                        onNextMatch={this.handleNextMatch}
                                        onPreviousMatch={this.handlePreviousMatch}
                                        onRedactAll={(redactionType) => {
                                            this.state.matches.forEach(m => this.addHighlight({
                                                content: m.content,
                                                position: m.position,
                                                comment: m.comment,
                                                redactionType
                                            }));
                                            hideTipAndSelection();
                                            this.setState({ matches: [], currentMatchIndex: 0 });
                                        }}
                                        onConfirm={(comment,redactionType) => {
                                            const { matches, currentMatchIndex } = this.state;
                                            const isSearchMode = matches.length > 0;
                                            
                                            this.addHighlight({
                                                content: isSearchMode ? matches[currentMatchIndex].content : content,
                                                position: isSearchMode ? matches[currentMatchIndex].position : position,
                                                comment,
                                                redactionType,
                                            });

                                            hideTipAndSelection();
                                            this.setState({ matches: [], currentMatchIndex: 0 });
                                        }}
                                    />
                                )}
                                highlightTransform={(
                                    highlight,
                                    index,
                                    setTip,
                                    hideTip,
                                    viewportToScaled,
                                    screenshot,
                                    isScrolledTo
                                ) => {
                                    const isTextHighlight = !Boolean(
                                        highlight.content &&
                                            highlight.content.image
                                    );

                                    const component = isTextHighlight ? (
                                        <Highlight
                                            isScrolledTo={isScrolledTo}
                                            position={highlight.position}
                                            comment={highlight.comment}
                                        />
                                    ) : (
                                        <AreaHighlight
                                            isScrolledTo={isScrolledTo}
                                            highlight={highlight}
                                            onChange={(boundingRect) => {
                                                this.updateHighlight(
                                                    highlight.id,
                                                    {
                                                        boundingRect:
                                                            viewportToScaled(
                                                                boundingRect
                                                            ),
                                                    },
                                                    {
                                                        image: screenshot(
                                                            boundingRect
                                                        ),
                                                    }
                                                );
                                            }}
                                        />
                                    );

                                    return (
                                        <Popup
                                            popupContent={
                                                <HighlightPopup
                                                    {...highlight}
                                                    onClick={() => {
                                                        this.removeHighlight(
                                                            highlight.id
                                                        );
                                                        hideTip();
                                                    }}
                                                />
                                            }
                                            onMouseOver={(popupContent) =>
                                                setTip(
                                                    highlight,
                                                    (highlight) => popupContent
                                                )
                                            }
                                            onMouseOut={hideTip}
                                            key={index}
                                            children={component}
                                        />
                                    );
                                }}
                                highlights={displayHighlights}
                            />
                        )}
                    </PdfLoader>
                </div>
            </>
        );
    }
}

export default App;
