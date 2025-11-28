<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // POST /api/register
    public function register(Request $request)
    {
        $data = $request->validate([
           'name' => 'required|max:255',
           'email' => 'required|email|max:255|unique:users',
           'password' => 'required|min:6|confirmed',
        ]);

        $user = User::create($data);

        $token = $user->createToken($request->name);

        return [
           'user' => $user,
           'token' => $token->plainTextToken,
        ];
    }

    // POST /api/login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            // return [
            //     'message' => [
            //         'email' => ['The provided credentials are incorrect.']
            //     ]
            // ];
            return [
                'message' => 'The provided credentials are incorrect.' 
            ];
        }

        $token = $user->createToken($user->name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    // POST /api/logout
    public function logout(Request $request)
        {
            $request->user()->tokens()->delete();

            return [
                'message' => 'You are logged out.' 
            ];
        }
}
