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
        User.create(name: params[:name], email: params[:email])
      end

      private

      def user
        User.find(params[:id])
      end
    end
  end
end
