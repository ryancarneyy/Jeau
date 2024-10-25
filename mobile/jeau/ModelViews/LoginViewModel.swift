//
//  LoginViewModel.swift
//  mobile
//
//  Created by Ryan Carney on 10/24/24.
//

import SwiftUI

enum Destination : Hashable {
    case home
}

class LoginViewModel: ObservableObject {
    
    @Published var username: String = ""
    @Published var password: String = ""
    @Published var loginFailed: Bool = false
    @Published var isLoading: Bool = false
    @Published var currentDestination: Destination? = nil
    
    // Function to handle the login action
    func login() {
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
                self.isLoading = false
            }
            
            guard let _ = data, error == nil else {
                print("Network error: \(error?.localizedDescription ?? "Unknown error")")
                DispatchQueue.main.async {
                    self.loginFailed = true
                }
                return
            }
            // Handle the response
            if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 {
                DispatchQueue.main.async {
                    print("Successful login")
                    self.loginFailed = false
                    self.currentDestination = .home
                }
            } else {
                DispatchQueue.main.async {
                    self.loginFailed = true
                }
            }
        }.resume()
    }
}

