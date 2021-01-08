const numberValidator = require('../validators/number')
const dateValidator = require('../validators/date')
const stringValidator = require('../validators/string')

const PULSE_FIELDS = {
  id: 0,
  mts: 1,
  userID: 3,
  title: 5,
  content: 6,
  isPin: 9,
  isPublic: 10,
  tags: 12,
  attachments: 13,
  likes: 15,
  userLiked: 16,
  pulseProfile: 18,
  comments: 19
}

const PULSE_COMMENT_FIELDS = {
  id: 0,
  mts: 1,
  parent: 2,
  userID: 3,
  title: 5,
  content: 6,
  isPin: 9,
  isPublic: 10,
  tags: 12,
  attachments: 13,
  likes: 15,
  userLiked: 16,
  pulseProfile: 18
}

const pulseValidator = {
  id: stringValidator,
  mts: dateValidator,
  userID: stringValidator,
  title: stringValidator,
  content: stringValidator,
  isPin: numberValidator,
  isPublic: numberValidator,
  tags: stringValidator,
  attachments: stringValidator,
  likes: numberValidator,
  userLiked: numberValidator,
  comments: numberValidator
}

const pulseCommentValidator = {
  id: stringValidator,
  mts: dateValidator,
  parent: stringValidator,
  userID: stringValidator,
  title: stringValidator,
  content: stringValidator,
  isPin: numberValidator,
  isPublic: numberValidator,
  tags: stringValidator,
  attachments: stringValidator,
  likes: numberValidator,
  userLiked: numberValidator
}

module.exports = {
  PULSE_FIELDS,
  PULSE_COMMENT_FIELDS,
  pulseValidator,
  pulseCommentValidator
}
