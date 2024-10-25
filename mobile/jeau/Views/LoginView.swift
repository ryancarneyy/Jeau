//
//  ContentView.swift
//  jeau
//
//  Created by Ryan Carney on 10/23/24.
//

import SwiftUI


struct LoginView: View {
    @ObservedObject var viewModel = LoginViewModel()
    @State private var path = [Destination]()  // Navigation stack path
    
    var body: some View {
        NavigationStack(path: $path) {
            VStack {
                Text("Jeau")
                    .font(.largeTitle)
                    .padding(.bottom, 40)
                
                TextField("Username", text: $viewModel.username)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()
                
                SecureField("Password", text: $viewModel.password)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()
                
                if viewModel.loginFailed {
                    Text("Invalid username or password")
                        .foregroundColor(.red)
                        .padding(.bottom, 10)
                }
                if viewModel.isLoading {
                    ProgressView("Logging in...")
                        .padding(.bottom, 10)
                }
                Button(action: {
                    viewModel.isLoading = true
                    viewModel.login()
                }) {
                    Text("Login")
                        .frame(minWidth: 0, maxWidth: .infinity)
                        .padding()
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }
                .padding()
            }.navigationDestination(for: Destination.self) { destination in
                switch destination {
                case .home:
                    HomeView()
                }
            }
            // Listen for changes in `currentDestination` and append to path
            .onReceive(viewModel.$currentDestination) { newDestination in
                if let destination = newDestination {
                    print("Navigating to: \(destination)")
                    path.append(destination)  // Trigger navigation by appending to path
                }
            }
        }
        .padding()
    }
}

#Preview {
    LoginView()
}
