require 'rails_helper'

describe Api::V1::UsersController do
  describe 'GET /api/users' do
    it 'returns all users' do
      10.times do
        create(:user)
      end
      create(:user, name: 'Janusz', email: 'fake.mail@example.com')

      get '/api/v1/users'

      expect(response.status).to eq(200)
      expect(JSON.parse(response.body).count).to eq 11
      expect(JSON.parse(response.body).last.name).to eq 'Janusz'
      expect(JSON.parse(response.body).last.email).to eq 'fake.mail@example.com'
    end
  end

  describe 'GET /api/users/:id' do
    it 'returns a specific user' do
      create(:user, name: 'Janusz', email: 'fake.mail@example.com', id: 4)

      get '/api/v1/users/4'

      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)['name']).to eq 'Janusz'
      expect(JSON.parse(response.body)['email']).to eq 'fake.mail@example.com'
    end
  end

  describe 'POST /api/users' do
    it 'creates new user' do

    end
  end
end
