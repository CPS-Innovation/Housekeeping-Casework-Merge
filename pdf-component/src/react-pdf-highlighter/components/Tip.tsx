import React,{ Component,RefObject } from "react";

import "../style/Tip.css";

interface State {
  compact: boolean;
  text: string;
  emoji: string;
  redactionType: string
}

interface Props {
  onConfirm: (comment: { text: string; emoji: string },redactionType: string) => void;
  onOpen: () => void;
  onUpdate?: () => void;
}

export class Tip extends Component<Props, State> {
  state: State = {
    compact: true,
    text: "",
    emoji: "",
    redactionType: "",
  };
  private myRef: RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);
    this.myRef = React.createRef<HTMLInputElement>();
  }

  componentDidMount(): void {
    this.myRef?.current?.addEventListener("mousedown", (event: MouseEvent) => {
      event.stopPropagation();
    });
  }

  // for TipContainer
  componentDidUpdate(nextProps: Props, nextState: State) {
    const { onUpdate } = this.props;

    if (onUpdate && this.state.compact !== nextState.compact) {
      onUpdate();
    }
  }

  redactModal = () => {
    return (
      <div
        id="redact-modal"
        role="dialog"
        aria-modal="true"
        className="Tip__card"
        ref={this.myRef}
      >
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="redaction-types-select">
            Select Redaction Type
          </label>

          <select
            className="govuk-select"
            name="redaction-types"
            id="redaction-types-select"
            onChange={(e) => {
              console.log("e.target.value", e.target.value)
              this.setState({ redactionType: e.target.value })
            }}
          >
            <option value=""> -- select redaction type -- </option>
            <option value="Address">Address</option>
            <option value="Date of Birth">Date of Birth</option>
            <option value="Named individual">Named individual</option>      
            <option value="Occupation">Occupation</option>
            <option value="Phone number">Phone number</option>
            <option value="Vehicle registration">Vehicle registration</option>
            <option value="Email address">Email address</option>
            <option value="Location">Location</option>
            <option value="Bank details">Bank details</option>
            <option value="Previous convictions">Previous convictions</option>
            <option value="Relationship to others">Relationship to others</option>
            <option value="NHS number">NHS number</option>
            <option value="NI number">NI number</option>
            <option value="Title">Title</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <p className="govuk-body-s">This phrase appears <strong>21</strong> times in the document</p>
        <div className="govuk-grid-row" style={{display:"block", justifyContent:"space-between"}}>
        <button
          className="Tip__btn-redact govuk-button--secondary"
          disabled={!this.state.redactionType}
          onClick={() => {
            this.props.onConfirm({ text: "", emoji: "" }, this.state.redactionType);
            // @ts-ignore
            disableRotateRemove();
          }}
        >
          View previous
        </button>
        <button
          className="Tip__btn-redact govuk-button--secondary"
          disabled={!this.state.redactionType}
          onClick={() => {
            this.props.onConfirm({ text: "", emoji: "" }, this.state.redactionType);
            // @ts-ignore
            activateLink();
            // @ts-ignore
            disableRotateRemove();
          }}
        >
          View next
        </button>
        </div>
        <div className="govuk-grid-row" style={{display:"block", justifyContent:"space-between"}}>
        <button
          className="Tip__btn-redact"
          disabled={!this.state.redactionType}
          onClick={() => {
            this.props.onConfirm(
              { text: "", emoji: "" },
              this.state.redactionType
            );
            // @ts-ignore
            disableRotateRemove();
          }}
        >
          Redact this text
        </button>
        <button
          className="Tip__btn-redact"
          disabled={!this.state.redactionType}
          onClick={() => {
            this.props.onConfirm(
              { text: "", emoji: "" },
              this.state.redactionType
            );
            // @ts-ignore
            activateLink();
            // @ts-ignore
            disableRotateRemove();
          }}
        >
          Find matching text
        </button>

        </div>
      </div>
    )
  }

  render() {
    const { onConfirm, onOpen } = this.props;
    const { compact, text, emoji } = this.state;

    return (
      <div className="Tip">
        {compact ? (
          this.redactModal()
        ) : (
          <form
            className="Tip__card"
            onSubmit={(event) => {
              event.preventDefault();
              onConfirm({ text, emoji },this.state.redactionType);
            }}
          >
            <div>
              <textarea
                placeholder="Your comment"
                autoFocus
                value={text}
                onChange={(event) =>
                  this.setState({ text: event.target.value })
                }
                ref={(node) => {
                  if (node) {
                    node.focus();
                  }
                }}
              />
              <div>
                {["💩", "😱", "😍", "🔥", "😳", "⚠️"].map((_emoji) => (
                  <label key={_emoji}>
                    <input
                      checked={emoji === _emoji}
                      type="radio"
                      name="emoji"
                      value={_emoji}
                      onChange={(event) =>
                        this.setState({ emoji: event.target.value })
                      }
                    />
                    {_emoji}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <input type="submit" value="Save" />
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Tip;
