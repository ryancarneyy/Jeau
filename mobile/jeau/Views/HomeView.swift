//
//  HomeView.swift
//  mobile
//
//  Created by Ryan Carney on 10/24/24.
//

import SwiftUI

struct HomeView: View {
    
    var body: some View {
        TabView {
            DealsView()
                .tabItem {
                    Image(systemName: "tag.fill")
                    Text("Deals")
                        .font(.headline)
                }
            ProfileView()
                .tabItem {
                    Image(systemName: "person.crop.circle")
                    Text("Profile")
                        .font(.headline)
                }
        }
    }
}

#Preview {
    HomeView()
}
