module Api
  module V1
    class UsersController < ApplicationController
      def index
        render json: User.all
      end

      def show
        render json: user
      end

      def create
        @user = User.new(name: params[:name], email: params[:email])
        if @user.save
          valid_user_creation
        else
          invalid_user_creation
        end
      end

      private

      def user
        User.find(params[:id])
      end

      def valid_user_creation
        render json: { message: 'User has been created' }, status: :created
      end

      def invalid_user_creation
        render json: { error: @user.errors.messages }, status: :unprocessable_entity
      end
    end
  end
end
