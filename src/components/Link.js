import React from "react";
import PropTypes from "prop-types";
import { AUTH_TOKEN } from "../constants";
import { timeDifferenceForDate } from "../utils";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;
const Link = props => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{this.props.index + 1}.</span>
        {authToken && (
          <Mutation
            mutation={VOTE_MUTATION}
            variables={{ linkId: this.props.link.id }}
            update={(store, { data: { vote } }) =>
              this.props.updateStoreAfterVote(store, vote, this.props.link.id)
            }
          >
            {voteMutation => (
              <button className="ml1 gray f11" onClick={voteMutation}>
                Vote for link
              </button>
            )}
          </Mutation>
        )}
      </div>
      <div className="ml1">
        <div>
          {props.link.description} ({props.link.url})
        </div>
        <div className="f6 lh-copy gray">
          {this.props.link.votes.length} votes | by{" "}
          {this.props.link.postedBy ? this.props.link.postedBy.name : "Unknown"}{" "}
          {timeDifferenceForDate(this.props.link.createdAt)}
        </div>
      </div>
    </div>
  );
};

Link.propTypes = {
  link: PropTypes.shapeOf({
    description: PropTypes.string,
    url: PropTypes.string
  }).isRequired
};

export default Link;
