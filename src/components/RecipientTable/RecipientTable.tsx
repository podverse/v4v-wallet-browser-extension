import React, { useState } from 'react'
import { ValueRecipient, ValueTag } from '../../lib/types'

type Props = {
  valueTag?: ValueTag
}

export const RecipientTable = ({ valueTag }: Props) => {
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false)
  const showMoreInfoText = showMoreInfo ? 'Hide more info' : 'Show more info'

  const toggleShowMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo)
  }

  const generateRecipients = () => {
    const recipients = valueTag?.recipients || []
    return recipients.map((recipient: ValueRecipient, index: number) => {
      return (
        <div className='recipient' key={`recipient-${index}`}>
          <div className='recipient-table-row'>
            <div className='name'>{recipient.name}</div>
            <div className='split'>{recipient.split}%</div>
          </div>
          {
            showMoreInfo && (
              <>
                <div className='address'>Address: {recipient.address}</div>
                {
                  recipient.customKey && (
                    <div className='custom-key'>Custom key: {recipient.customKey}</div>
                  )
                }
                {
                  recipient.customValue && (
                    <div className='custom-value'>Custom value: {recipient.customValue}</div>
                  )
                }
              </>
            )
          }
        </div>
      )
    })
  }

  return (
    <div className='recipient-table'>
      <div className='recipient-table-header'>
        <div className='recipient-table-header-text'>Recipients</div>
        <button className='toggle-show-more-info' onClick={toggleShowMoreInfo}>{showMoreInfoText}</button>
      </div>
      {generateRecipients()}
    </div>
  )
}
