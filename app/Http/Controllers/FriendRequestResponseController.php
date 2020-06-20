<?php

namespace App\Http\Controllers;

use App\Exceptions\FriendRequestNotFoundException;
use App\Friend;
use \App\Http\Resources\Friend as FriendResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class FriendRequestResponseController extends Controller
{
    public function store()
    {
//      custom ValidationErrorException into app/Exceptions/Handler.php:54
        $data = request()->validate([
            'user_id' => 'required',
            'status' => 'required'
        ]);

        try {
            $friendRequest = Friend::where('user_id', $data['user_id'])
                ->where('friend_id', auth()->user()->id)
                ->firstOrFail();
        } catch (ModelNotFoundException $exception) {
            throw new FriendRequestNotFoundException();
        }

        $friendRequest->update(array_merge($data, [
            'confirmed_at' => now()
        ]));

        return new FriendResource($friendRequest);
    }

    public function destroy()
    {
        $data = request()->validate([
            'user_id' => 'required'
        ]);

        try {
            $friendRequest = Friend::where('user_id', $data['user_id'])
                ->where('friend_id', auth()->user()->id)
                ->firstOrFail()
                ->delete();
        } catch (ModelNotFoundException $exception) {
            throw new FriendRequestNotFoundException();
        }

        return response()->json([], 204);
    }
}
