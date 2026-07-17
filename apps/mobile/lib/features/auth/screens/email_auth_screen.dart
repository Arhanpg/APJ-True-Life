import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../data/repositories/auth_repository.dart';

/// Email/Password authentication screen.
/// Supports both sign-in and registration.
class EmailAuthScreen extends StatefulWidget {
  const EmailAuthScreen({super.key});

  @override
  State<EmailAuthScreen> createState() => _EmailAuthScreenState();
}

class _EmailAuthScreenState extends State<EmailAuthScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _authRepository = AuthRepository();
  bool _isLoading = false;
  bool _isRegistering = false;
  bool _obscurePassword = true;

  Future<void> _signIn() async {
    if (_emailController.text.trim().isEmpty || _passwordController.text.isEmpty) {
      _showError('Please enter both email and password');
      return;
    }

    setState(() => _isLoading = true);
    try {
      final user = await _authRepository.signInWithEmail(
        _emailController.text.trim(),
        _passwordController.text,
      );
      if (user != null && mounted) {
        context.go('/consent');
      }
    } catch (e) {
      if (mounted) _showError('Sign-in failed: ${_getErrorMessage(e)}');
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _register() async {
    if (_emailController.text.trim().isEmpty || _passwordController.text.isEmpty) {
      _showError('Please enter both email and password');
      return;
    }
    if (_passwordController.text != _confirmPasswordController.text) {
      _showError('Passwords do not match');
      return;
    }
    if (_passwordController.text.length < 6) {
      _showError('Password must be at least 6 characters');
      return;
    }

    setState(() => _isLoading = true);
    try {
      final user = await _authRepository.registerWithEmail(
        _emailController.text.trim(),
        _passwordController.text,
      );
      if (user != null && mounted) {
        context.go('/consent');
      }
    } catch (e) {
      if (mounted) _showError('Registration failed: ${_getErrorMessage(e)}');
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  String _getErrorMessage(dynamic e) {
    if (e.toString().contains('user-not-found')) return 'No account found with this email';
    if (e.toString().contains('wrong-password')) return 'Incorrect password';
    if (e.toString().contains('email-already-in-use')) return 'This email is already registered';
    if (e.toString().contains('invalid-email')) return 'Invalid email address';
    if (e.toString().contains('weak-password')) return 'Password is too weak';
    return e.toString();
  }

  void _showError(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_isRegistering ? 'Create Account' : 'Sign In'),
        backgroundColor: const Color(0xFF1A5C38),
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SizedBox(height: 32),
            Icon(Icons.email_outlined, size: 64, color: Colors.grey.shade400),
            const SizedBox(height: 24),
            Text(
              _isRegistering ? 'Create your account' : 'Welcome back',
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              _isRegistering
                  ? 'Enter your email and create a password'
                  : 'Sign in with your email and password',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.grey.shade600),
            ),
            const SizedBox(height: 32),
            // Email field
            TextField(
              controller: _emailController,
              keyboardType: TextInputType.emailAddress,
              decoration: InputDecoration(
                labelText: 'Email',
                hintText: 'patient@example.com',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                prefixIcon: const Icon(Icons.email_outlined),
              ),
            ),
            const SizedBox(height: 16),
            // Password field
            TextField(
              controller: _passwordController,
              obscureText: _obscurePassword,
              decoration: InputDecoration(
                labelText: 'Password',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                prefixIcon: const Icon(Icons.lock_outline),
                suffixIcon: IconButton(
                  icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility),
                  onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                ),
              ),
            ),
            if (_isRegistering) ...[
              const SizedBox(height: 16),
              // Confirm password field
              TextField(
                controller: _confirmPasswordController,
                obscureText: true,
                decoration: InputDecoration(
                  labelText: 'Confirm Password',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  prefixIcon: const Icon(Icons.lock_outline),
                ),
              ),
            ],
            const SizedBox(height: 24),
            // Submit button
            SizedBox(
              height: 52,
              child: ElevatedButton(
                onPressed: _isLoading
                    ? null
                    : _isRegistering
                        ? _register
                        : _signIn,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1A5C38),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: _isLoading
                    ? const CircularProgressIndicator(color: Colors.white)
                    : Text(
                        _isRegistering ? 'Create Account' : 'Sign In',
                        style: const TextStyle(fontSize: 16),
                      ),
              ),
            ),
            const SizedBox(height: 16),
            // Toggle sign-in / register
            TextButton(
              onPressed: () {
                setState(() {
                  _isRegistering = !_isRegistering;
                  _confirmPasswordController.clear();
                });
              },
              child: Text(
                _isRegistering
                    ? 'Already have an account? Sign In'
                    : 'Don\'t have an account? Register',
                style: const TextStyle(color: Color(0xFF1A5C38)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
