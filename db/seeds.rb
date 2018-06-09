require 'faker'
require 'factory_bot_rails'

20.times do
  FactoryBot.create(:user)
end
