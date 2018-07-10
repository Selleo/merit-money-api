require 'rails_helper'

describe Api::V1::UsersController do
  describe 'GET /api/users' do
    it 'returns all users' do
      3.times do |i|
        create(:user, name: "name_#{i}", email: "email_#{i}@example.com")
      end

      get '/api/v1/users'

      expect(response.status).to eq(200)
      expect(json_response.count).to eq 3
      expect(json_response.first).to include('name' => 'name_0', 'email' => 'email_0@example.com')
      expect(json_response.second).to include('name' => 'name_1', 'email' => 'email_1@example.com')
      expect(json_response.third).to include('name' => 'name_2', 'email' => 'email_2@example.com')
    end

    it 'returns empty array if users do not exist' do
      get '/api/v1/users'

      expect(response.status).to eq(200)
      expect(json_response).to eq []
    end
  end

  describe 'GET /api/users/:id' do
    it 'returns a specific user' do
      user = create(:user, name: 'Janusz', email: 'fake.mail@example.com')

      get "/api/v1/users/#{user.id}"

      expect(response.status).to eq(200)
      expect(json_response).to include('name' => 'Janusz', 'email' => 'fake.mail@example.com')
    end

    it 'returns an error if user not found' do
      get '/api/v1/users/4'

      expect(response.status).to eq(404)
      expect(json_response).to include('error' => "Couldn't find User with 'id'=4")
    end
  end

  describe 'POST /api/users' do
    it 'creates a new user' do
      expect do
        post '/api/v1/users', params: { name: 'Grazyna', email: 'newmail@example.com' }
      end.to change { User.count }.by(1)
      expect(response.status).to eq(201)
      expect(User.last).to have_attributes('name' => 'Grazyna', 'email' => 'newmail@example.com')
    end

    it 'returns an error if params are invalid' do
      expect { post '/api/v1/users', params: { name: 'Grazyna' } }.not_to change { User.count }
      expect(response.status).to eq(422)
      expect(json_response).to include('error' => { "email" => ["can't be blank"] })
    end
  end
end
