import React from 'react'
import PropTypes from 'prop-types'

const Link = props => (
  <div>
    {props.link.description} ({props.link.url})
  </div>
);

Link.propTypes = {
  link: PropTypes.shapeOf({
    description: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}

export default Link

