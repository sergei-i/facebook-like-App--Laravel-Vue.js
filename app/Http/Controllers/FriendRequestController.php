<?php

namespace App\Http\Controllers;

use App\Exceptions\UserNotFoundException;
use App\Exceptions\ValidationErrorException;
use App\Friend;
use App\User;
use \App\Http\Resources\Friend as FriendResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class FriendRequestController extends Controller
{
    public function store()
    {

        $data = request()->validate([
            'friend_id' => 'required'
        ]);

//        custom ValidationErrorException into app/Exceptions/Handler.php:54
//        try {
//            $data = request()->validate([
//                'friend_id' => 'required'
//            ]);
//        } catch (ValidationException $exception) {
//            throw new ValidationErrorException(json_encode($exception->errors()));
//        }

        try {
            User::findOrFail($data['friend_id'])->friends()->syncWithoutDetaching(auth()->user());
        } catch (ModelNotFoundException $exception) {
            throw new UserNotFoundException();
        }

        return new FriendResource(
            Friend::where('user_id', auth()->user()->id)
                ->where('friend_id', $data['friend_id'])
                ->first()
        );
    }
}
