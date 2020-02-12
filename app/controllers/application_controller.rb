class ApplicationController < ActionController::API
  def encode_token(payload)
    JWT.encode(payload, 'Dope2020')
  end

  def session_player
    decoded_hash = decoded_token
    if !decoded_hash.empty?
      player_id = decoded_hash[0]['player_id']
      @player = Player.find_by(id: player_id)
    else
      nil
    end
  end

  def logged_in?
    !!session_player
  end

  def auth_header
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, 'Dope2020', true, algorithm: 'HS256')
      rescue JWT::DecodeError
        []
      end
    else
      []
    end
  end
end
