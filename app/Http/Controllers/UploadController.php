<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Upload;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'message' => 'required|string',
            'file' => 'required|mimes:jpeg,png,gif,pdf,doc,docx|max:5000'
        ]);

        // Handle the file upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filePath = $file->store('uploads');
            $upload = Upload::create([
                'name' => $request->input('name'),
                'message' => $request->input('message'),
                'file_name' => $file->getClientOriginalName(),
            ]);
            return response()->json(['upload' => $upload], 201);
        }

        return response()->json(['error' => 'File not uploaded'], 400);
    }
}
