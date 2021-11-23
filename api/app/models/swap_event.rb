# == Schema Information
#
# Table name: swap_events
#
#  id             :bigint           not null, primary key
#  function_name  :string           not null
#  transaction_id :string           not null
#  event_at       :datetime         not null
#  sender         :string           not null
#  pool_id        :bigint           not null
#  token_x_amount :bigint           not null
#  token_y_amount :bigint           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class SwapEvent < ApplicationRecord
  belongs_to :pool

  validates :transaction_id, uniqueness: true
end
