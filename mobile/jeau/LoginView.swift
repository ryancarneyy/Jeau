//
//  ContentView.swift
//  jeau
//
//  Created by Ryan Carney on 10/23/24.
//

import SwiftUI

struct LoginView: View {
    @State private var username: String = ""
    @State private var password: String = ""
    @State private var loginFailed: Bool = false
    @State private var loginSuccess: Bool = false
    @State private var isLoading: Bool = false
    
    var body: some View {
        VStack {
            Text("Jeau")
                .font(.largeTitle)
                .padding(.bottom, 40)
            
            TextField("Username", text: $username)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            
            SecureField("Password", text: $password)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            
            if loginFailed {
                Text("Invalid username or password")
                    .foregroundColor(.red)
                    .padding(.bottom, 10)
            }
            
            if isLoading {
                ProgressView("Logging in...")
                    .padding(.bottom, 10)
            }
            if loginSuccess {
                
            }
            Button(action: {
                isLoading = true
                login()
            }) {
                Text("Login")
                    .frame(minWidth: 0, maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            .padding()
        }
        .padding()
    }
    
    // Function to handle the login action
    func login() {
        // Replace with the URL of your Django backend login endpoint
        guard let url = URL(string: "http://localhost:8000/api/users/login") else {
            print("Invalid URL")
            return
        }
        
        let parameters = ["username": username, "password": password]
        
        // Convert parameters to JSON data
        guard let jsonData = try? JSONSerialization.data(withJSONObject: parameters) else {
            print("Error encoding parameters")
            return
        }
        
        // Create the request
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = jsonData
        
        // Perform the network request
        URLSession.shared.dataTask(with: request) { data, response, error in
            DispatchQueue.main.async {
                isLoading = false
            }
            
            guard let data = data, error == nil else {
                print("Network error: \(error?.localizedDescription ?? "Unknown error")")
                DispatchQueue.main.async {
                    loginFailed = true
                }
                return
            }
            
            // Handle the response
            if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 {
                DispatchQueue.main.async {
                    loginSuccess = true
                }
            } else {
                DispatchQueue.main.async {
                    loginFailed = true
                }
            }
        }.resume()
    }

}

#Preview {
    LoginView()
}
