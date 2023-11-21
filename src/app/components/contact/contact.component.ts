import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string = '';
  selectedCase: string = '';
  message: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  cooldownTime: number = 60000;
  private lastMessageSentTime: number = 0;

  constructor() {
    document.title = 'Contact - RoadMaster';
    // Initialize the lastMessageSentTime from localStorage
    const lastMessageSentTime = localStorage.getItem('lastMessageSentTime');
    if (lastMessageSentTime) {
      this.lastMessageSentTime = parseInt(lastMessageSentTime, 10);
    }
  }

  submitForm() {
    const currentTime = Date.now();

    // Check if the cooldown period has passed
    if (this.lastMessageSentTime && currentTime - this.lastMessageSentTime < this.cooldownTime) {
      this.errorMessage = `Please wait before sending another message. (${Math.round((this.cooldownTime - (currentTime - this.lastMessageSentTime)) / 1000)} seconds)`;
      this.successMessage = '';
      return;
    }

    if (!this.selectedCase || !this.message || !this.name) {
      this.errorMessage = 'Please fill out all fields.';
      this.successMessage = '';
      return;
    }

    const embeds: { [key: string]: any } = {
      issue: {
        color: 0xFF0000,  // Red
        title: 'Bug Report',
        description: this.message,
        author: {
          name: this.name,
        },
        timestamp: new Date().toISOString(),
      },
      addAccount: {
        color: 0xFFA500,  // Orange
        title: 'Add Account',
        description: this.message,
        author: {
          name: this.name,
        },
        timestamp: new Date().toISOString(),
      },
      idea: {
        color: 0x00FF00,  // Green
        title: 'Feature Request',
        description: this.message,
        author: {
          name: this.name,
        },
        timestamp: new Date().toISOString(),
      },
      message: {
        color: 0x0000FF,  // Blue
        title: 'Message',
        description: this.message,
        author: {
          name: this.name,
        },
        timestamp: new Date().toISOString(),
      },
    };

    const selectedEmbed = embeds[this.selectedCase];

    if (!selectedEmbed) {
      this.errorMessage = 'Please select a valid case.';
      this.successMessage = '';
      return;
    }

    const data = {
      embeds: [selectedEmbed],
    };

    const webhookUrl = 'https://discord.com/api/webhooks/1166719017222942741/XdvtIqsOYwZXsZyfJrhC1iKGZnjJ3KenW5tT2Ee8xDx8erL8y4sM_j8zVbUisvY65szK';

    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          this.successMessage = 'Your message has been sent!';
          this.errorMessage = '';
          this.lastMessageSentTime = currentTime; // Update the last message sent time
          localStorage.setItem('lastMessageSentTime', this.lastMessageSentTime.toString()); // Store it in localStorage
        } else {
          this.errorMessage = 'Something went wrong. Please try again later.';
          this.successMessage = '';
        }
      })
      .catch(error => {
        console.error({error: 'Error:'}, error);
      });
  }
}
