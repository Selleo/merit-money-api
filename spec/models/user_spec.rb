require 'rails_helper'

describe User do
  describe 'email validation' do
    it 'returns an error if email is already in database' do
      create(:user, email: 'example@email.com')
      user = User.create(email: 'example@email.com')
      user.valid?
      expect(user.errors[:email]).not_to be_empty
    end

    it 'returns an error if email is not present' do
      user = User.create
      user.valid?
      expect(user.errors[:email]).not_to be_empty
    end

    it 'does not return any error if email is present' do
      user = create(:user, email: 'example@email.com')
      user.valid?
      expect(user.errors[:email]).to be_empty
    end
  end
end
